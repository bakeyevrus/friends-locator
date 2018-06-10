import React from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from '../config';

const mapStyle = {
  width: '100%',
  height: '100%'
};

// Initial coordinates point to Germany
const mapInitialCenter = {
  lat: 52.520008,
  lng: 13.404954
};

// TODO: component needs refactoring
class GoogleMapContainer extends React.Component {
  state = {
    showMarkerInfo: false,
    activeMarker: null,
    selectedPhotoLink: ''
  };

  onMarkerClick = (ownerId, selectedPosition) => (props, marker) => {
    const { coordinates } = this.props;
    const filteredPositionObject = coordinates[ownerId].find(actualPosition =>
      actualPosition.lat === selectedPosition.lat && actualPosition.lng === selectedPosition.lng);

    this.setState({
      selectedPhotoLink: filteredPositionObject.link,
      activeMarker: marker,
      showMarkerInfo: true
    });
  };

  onMapClicked = () => {
    const { showMarkerInfo } = this.state;

    if (showMarkerInfo) {
      this.setState({
        showMarkerInfo: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { activeMarker, selectedPhotoLink, showMarkerInfo } = this.state;
    const { google, coordinates } = this.props;

    const markersArray = [];
    Object.entries(coordinates).forEach(([ownerId, geotags]) => {
      geotags.forEach((position) => {
        markersArray.push(<Marker
          key={position.id}
          onClick={this.onMarkerClick(ownerId, position)}
          position={{ lat: position.lat, lng: position.lng }}
        />);
      });
    });

    return (
      <Map
        google={google}
        zoom={7}
        style={mapStyle}
        onClick={this.onMapClicked}
        centerAroundCurrentLocation
        initialCenter={mapInitialCenter}
      >
        {markersArray}
        <InfoWindow marker={activeMarker} visible={showMarkerInfo}>
          <div>
            <img src={selectedPhotoLink} alt="Your friend's marker" height={300} />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

GoogleMapContainer.propTypes = {
  coordinates: PropTypes.objectOf(PropTypes.array).isRequired,
  /* eslint-disable */
  google: PropTypes.object.isRequired
};

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_API_KEY
})(GoogleMapContainer);
