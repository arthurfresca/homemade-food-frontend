/* global google */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from '../../../lib';


const WithGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={11}
    defaultCenter={props.defaultCenter}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

export default class GMap extends Component {

  static propTypes = {
    markers: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      key: PropTypes.number,
      defaultAnimation: PropTypes.number,
      title: PropTypes.string,
    })),
    defaultCenter: PropTypes.shape({
      lat: PropTypes.number,
      long: PropTypes.number,
    }),
  };
  static defaultProps = {
    markers: [],
    defaultCenter: { lat: 0, lng: 0 },
  };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <div style={{ height: '400px' }}>
        <WithGoogleMap
          containerElement={
            <div style={{ height: '400px' }} />
          }
          mapElement={
            <div style={{ height: '400px' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.props.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          defaultCenter={this.props.defaultCenter}
        />
      </div>
    );
  }
}
