import React from 'react';

import Helmet from "react-helmet";

class ContactHandler extends React.Component{
  componentDidMount(){

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="main-content contact-page">
        <Helmet
          title={"title"}
          titleTemplate={"Page" + " - %s"} />
        Contact
      </div>
    )
  }
}

export default ContactHandler;
