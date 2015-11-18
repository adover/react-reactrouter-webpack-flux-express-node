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

// run the server
let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
