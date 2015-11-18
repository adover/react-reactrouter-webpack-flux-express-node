import React from 'react';
import Helmet from "react-helmet";

class  NotFoundHandler extends React.Component{

  render() {
    return (
      <div className="wrapper fourohfour">
        <Helmet
          title="The page you requested cannot be found"
          titleTemplate={"404" + " - %s"} />
          Not Found!!
      </div>
    )
  }
}

export default NotFoundHandler;
