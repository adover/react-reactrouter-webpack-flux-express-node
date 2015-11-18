import React from 'react';
import SearchAction from '../../actions/searchAction';
import { Link, Navigation } from 'react-router';
import { getOpenHours, getUrl } from '../../utils';
import siteSearchEmitter from '../../emitters/siteSearchEmitter';


let StoreItem = React.createClass({
    mixins: [ Navigation ],
    clickHandler(e) {
        e.preventDefault();
        siteSearchEmitter.emit('close');
        let link = getUrl(this.props.store);

        this.transitionTo(link);
    },
    render(){
        let openHours = getOpenHours(this.props.store),
            link = getUrl(this.props.store);

        if (openHours !== 'hide') {
            openHours = <span className="open-hours">Open today: { openHours }</span>;
        } else {
            openHours = false;
        }

        return (
            <li className="result">
                <a href={link} onClick={this.clickHandler}>
                    <span className="store col1text" dangerouslySetInnerHTML={{__html: this.props.store.title}} />
                    {openHours}
                </a>
            </li>
        )
    }
});

let PageItem = React.createClass({
    mixins: [ Navigation ],
    clickHandler(e) {
        e.preventDefault();
        siteSearchEmitter.emit('close');

        let link = getUrl(this.props.page);

        this.transitionTo(link);
    },
    render(){
        let link = getUrl(this.props.page);

        return (
            <li className="result">
                <a href={link} onClick={this.clickHandler}>
                    <span className="store col1text" dangerouslySetInnerHTML={{__html: this.props.page.title}} />
                </a>
            </li>
        )
    }
});

let NewsItem = React.createClass({
    mixins: [ Navigation ],
    clickHandler(e) {
        e.preventDefault();
        siteSearchEmitter.emit('close');

        let link = getUrl(this.props.news);

        this.transitionTo(link);
    },
    render(){
        let link = getUrl(this.props.news);

        return (
            <li className="result">
                <a href={link} onClick={this.clickHandler}>
                    <span className="store col1text" dangerouslySetInnerHTML={{__html: this.props.news.title}} />
                </a>
            </li>
        )
    }
});


let SearchModal = React.createClass({
    matchRepresentation(match){
        // if store type
        if (_.has(match, 'object.type') && match.object.type === 'store') {
            return <StoreItem store={ match.object } results={ match.results } />;
        }
        if (_.has(match, 'object.type') && match.object.type === 'post') {
            return <NewsItem news={ match.object } results={ match.results } />;
        }
        if (_.has(match, 'object.type') && match.object.type === 'page') {
            return <PageItem page={ match.object } results={ match.results } />;
        }
        // if not a store
        return false;
    },
    componentDidMount(){
        siteSearchEmitter.addListener('close', this.closeModal);
    },
    compoenntWillUnmount(){
        siteSearchEmitter.removeListener('close', this.closeModal);
    },
    closeModal(){
      SearchAction.query('');
    },
    getEmptyResults(){
        return (
            <ul className="results">
                <li className="result no-results">
                    <span>Sorry we could not find any results for <em>{this.props.search.query}</em></span>
                </li>
            </ul>
        );
    },
    getDefaultResults(){
        return (
            <ul className="results"></ul>
        );
    },
    getResults(matches){
        return (
            <ul className="results">
                {matches}
            </ul>
        );
    },
    doFilter(e){
        let key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        // if(key == 40){
        //   if(document.querySelector('.result') && document.querySelector('.result').childNodes.length > 0){

        //   }
        // }else{
          let query = e.target.value;
          SearchAction.query(query);
        // }
    },
    render() {
        let self = this,
            results = false;

        if (self.props.cls == 'active') {
            window.setTimeout(function() {
                self.refs.searchInput.getDOMNode().focus();
            },600);
        };

        if (_.has(self, 'props.search.query') && self.props.search.query.length > 2) {
            if (_.isEmpty(self.props.search.matches)) {
                results = self.getEmptyResults();

            } else {
                let matchDom = [];
                _.forEach(_.take(self.props.search.matches, 6), function (m) {
                    matchDom.push(self.matchRepresentation(m));
                });
                results = self.getResults(matchDom);
            }
        } else {
            results = self.getDefaultResults();
        }

        return (
          <div className={"search-modal col-xs-12 col-sm-5 col-md-4 modal-box " + self.props.cls}>
            <input className="search-box" ref="searchInput" onKeyUp={self.doFilter} type="text" placeholder="Search..." />
                {results}
          </div>
        )
    }
});

export default SearchModal;
