import React from 'react';
import { NotFoundRoute, Route, RouteHandler } from 'react-router';
import Footer from './components/common/footer';
import Header from './components/common/header';

import StoreActionCreator from './actions/storeActionCreator.js';
import Store from './stores/store';

// This is the controller view
class App extends React.Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

 componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentDidMount() {
    StoreActionCreator.getData();
  }

  onChange() {
    let data = Store.getStore();
    this.setState({
      data: data.data
    });
  }

  render(){
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
      )
  }
};

export default App;
