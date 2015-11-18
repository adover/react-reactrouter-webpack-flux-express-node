import React from 'react';
import {Link} from 'react-router';
import PubSub from 'pubsub-js'

let token = null;

class FooterContainer extends React.Component{

    // PubSubExample - Remove this event or test by clicking on the header logo
    constructor() {
      super();
      this.testPubSub = this.testPubSub.bind(this);
    }

    testPubSub( msg, data ){
      console.log(msg, data );
    }

    componentDidMount(){
      token = PubSub.subscribe( 'MY TOPIC', this.testPubSub );
    }

    componentWillUnmount(){
      PubSub.unsubscribe( token );
    }
    render() {

        return (
            <footer className="footer">
              <div className="lower-footer container-fluid">
                <div className="container">
                  <div className="row">
                    <ul className="col-xs-12 col-sm-6">
                      <li><Link to="terms">Terms and conditions</Link></li>
                      <li><Link to="privacy">Privacy</Link></li>
                    </ul>
                    <p className="col-xs-12 col-sm-6 text-right">&copy; 2015 Dover does not mind it.</p>
                  </div>
                </div>
              </div>
            </footer>
        )
    }
}

export default FooterContainer;
