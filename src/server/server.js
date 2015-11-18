import createLocation from 'history/lib/createLocation'
import url from 'url';
import React from "react";
import routes from "../shared/routes";
import { renderToString } from 'react-dom/server'
import Router, { match, RoutingContext } from 'react-router'
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import redis from 'redis';
import host from '../shared/host';

let app = express();

const PORT = process.env.PORT || 3002;
const DEV_PORT = process.env.DEV_PORT || 8080;
const REDIS_NAMESPACE = 'react-node-frontend';

// set up Jade
app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.json())

/**
 * Matches all routes !api
 * This is then parsed through react router into the index.jade template in the views folder
 */
app.get(/^(?!.*(api|.js|.css)).*$/, function (req, res) {
  let location = createLocation(req.url);
  console.log("LOCAL")
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    console.log(location);
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        let content = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);

        res.status(200).render('index', {
          content: content,
          staticPort: DEV_PORT
        });

      } else {
        res.status(404).send('Not found')
      }
    })

});

function updateCache (callback) {
  let host = 'http://jsonplaceholder.typicode.com',
      endpoints = [
        'posts',
        'posts/1/comments',
      ];

  _.forEach(endpoints, function (endpoint, i) {
    request.get(url.resolve(host, endpoint), function (err, response, data) {
      let client = redis.createClient();

      console.log(data);

      client.set(`${REDIS_NAMESPACE}-${endpoint}`, data, function () {
        console.log("FINISHED CACHING", endpoint);
        client.quit();

        if (callback) callback();
      })
    });
  });
}

app.get('/api/cache/update', function (req, res) {
  res.send('Updating cache')
  updateCache()
});

/**
 * Retrieves a list of pages
 * @return {array} An array of page objects
 */
app.get('/api/posts', function (req, res) {
  let client = redis.createClient(),
      endpoint = 'posts';

  client.get(`${REDIS_NAMESPACE}-${endpoint}`, function (err, data) {
    if (err || data === undefined) {
      updateCache(function () {
        client.get(`${REDIS_NAMESPACE}-${endpoint}`, function (err, data) {
          res.json(JSON.parse(data));
          client.quit();
        });
      })
    }
    else {
      res.json(JSON.parse(data));
      client.quit();
    }
  });
});

/**
 * Retrieves a list of pages
 * @return {array} An array of page objects
 */
app.get('/api/comments', function (req, res) {
  let client = redis.createClient(),
      endpoint = 'posts/1/comments';

  client.get(`${REDIS_NAMESPACE}-${endpoint}`, function (err, data) {
    if (err || data === undefined) {
      updateCache(function () {
        client.get(`${REDIS_NAMESPACE}-${endpoint}`, function (err, data) {
          res.json(JSON.parse(data));
          client.quit();
        });
      })
    }
    else {
      res.json(JSON.parse(data));
      client.quit();
    }
  });
});



// run the server
let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
