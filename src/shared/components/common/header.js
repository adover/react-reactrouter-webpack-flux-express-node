import React from 'react';
import {Link} from 'react-router';
import PubSub from 'pubsub-js'

class Header extends React.Component{

    // PubSubExample - This event gets picked up by the footer
    handleClick(){
      PubSub.publish( 'MY TOPIC', 'hello world!' );
    }
    render() {
      return (
          <header className="site-header container-fluid">
            <div className="row">
              <div className="logo-section col-xs-6 col-sm-3" onClick={() => this.handleClick()}>
                <Link to="/"></Link>
              </div>
              <div className="navbar-section pull-right clearfix">
                <div className="desktop-items hidden-xs pull-right clearfix">
                  I'd put a nav bar here.
                </div>
              </div>
            </div>
          </header>
      )
    }
}

export default Header;
