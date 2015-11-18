import React from 'react';
import { Link } from 'react-router';

import SocialIcons from '../social';

let UpperFooter = React.createClass({
    render() {
        let socialLinks = (this.props.settings) ? this.props.settings.social : null;

        return (
            <div className="upper-footer container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-xs-7 col-sm-2">
                    <ul>
                     <li><Link to="/">Home</Link></li>
                     <li><Link to="mapDirectory">Our stores</Link></li>
                     <li><Link to="services">Centre info</Link></li>
                     <li><Link to="news">What's happening</Link></li>
                     <li><Link to="contact">Contact us</Link></li>
                    </ul>
                  </div>
                  <div className="col-xs-7 col-sm-2">
                    <ul>
                     <li><a href="http://kp.co.nz" target="_blank">Kiwi Property</a></li>
                    </ul>
                  </div>
                  <div className="col-xs-7 col-sm-3 social-section">
                    <p className="">Follow us</p>
                    <SocialIcons socialLinks={socialLinks} />
                  </div>
                </div>
              </div>
            </div>

        )
    }
});

export default UpperFooter;
