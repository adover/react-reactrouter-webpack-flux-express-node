import React from 'react';
import { Link, Navigation } from 'react-router';

let OpeningTimesModal = React.createClass({
  mixins: [Navigation],
  listingsClickHandler(e) {
    this.props.openingTimesClickHandler(e, close);

    e.preventDefault();
    this.transitionTo('/directory/listing');
  },

  clickHandle(e) {
    // e.stopPropagation();
  },
  render() {
    let special = [];

    this.props.specialopenhours.items.forEach(function(value, key) {
      special.push(<li className='whitetext'><span className='day'>{value.label}</span> {value.text}</li>);
    });

    return (
      <div className={'opening-times-modal modal-box column-wrap clearfix ' + this.props.cls}>
                    <div className='normal-hours column'>
                        <h3 className='whitetext'>Opening hours</h3>
                        <ul>
                            <li className='whitetext'><span className='day'>Monday</span> {this.props.openhours.monday.opens + ' - ' + this.props.openhours.monday.closes}</li>
                            <li className='whitetext'><span className='day'>Tuesday</span> {this.props.openhours.tuesday.opens + ' - ' + this.props.openhours.tuesday.closes}</li>
                            <li className='whitetext'><span className='day'>Wednesday</span> {this.props.openhours.wednesday.opens + ' - ' + this.props.openhours.wednesday.closes}</li>
                            <li className='whitetext'><span className='day'>Thursday</span> {this.props.openhours.thursday.opens + ' - ' + this.props.openhours.thursday.closes}</li>
                            <li className='whitetext'><span className='day'>Friday</span> {this.props.openhours.friday.opens + ' - ' + this.props.openhours.friday.closes}</li>
                            <li className='whitetext'><span className='day'>Saturday</span> {this.props.openhours.saturday.opens + ' - ' + this.props.openhours.saturday.closes}</li>
                            <li className='whitetext'><span className='day'>Sunday</span> {this.props.openhours.sunday.opens + ' - ' + this.props.openhours.sunday.closes}</li>
                        </ul>
                    </div>
                    <div className='special-hours column'>
                        <h3 className='whitetext'>{this.props.specialopenhours.title}</h3>
                        <ul>
                            {special}
                        </ul>
                    </div>
                    <a onClick={this.listingsClickHandler} className='ot-link'>*Individual store opening hours can be found on the store listing.</a>
                </div>
    );
  },
});

export default OpeningTimesModal;
