import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage main-content">
        <h1>HOMEPAGE</h1>
        <Link to="/contact">Contact</Link>
      </div>
    )
  }
};

export default HomePage;
