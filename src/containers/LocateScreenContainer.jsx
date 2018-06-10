import React from 'react';
import vkService from '../services/VkService';
import Loader from '../components/Loader';
import TryAgain from '../components/TryAgain';
import GoogleMapContainer from './GoogleMapContainer';

const PAGE_STATES = Object.freeze({
  INITIALIZING: 'INITIALIZING',
  AUTHORIZING: 'AUTHORIZING',
  FETCHING_FRIENDS_LIST: 'FETCHING_FRIENDS_LIST',
  FETCHING_PHOTOS: 'FETCHING_PHOTOS',
  FETCHING_GEOTAGS: 'FETCHING_GEOTAGS',
  DATA_FETCHED: 'DATA_FETCHED',
  ERROR: 'ERROR'
});

const PAGE_STATES_LABEL = Object.freeze({
  INITIALIZING: 'Initializing application',
  AUTHORIZING: 'Log in please',
  FETCHING_FRIENDS_LIST: 'Fetching friends list',
  FETCHING_PHOTOS: "Fetching your friends' photos",
  FETCHING_GEOTAGS: "Fetching your friends' geotags"
});

// Need to set 400 ms delay for every request because of API limitations
const API_CALL_DELAY = 400;

class LocateScreenContainer extends React.Component {
  state = {
    pageState: PAGE_STATES.INITIALIZING,
    pageStateLabel: PAGE_STATES_LABEL.INITIALIZING,
    friendsProcessed: 0,
    totalFriendsCount: 1
  };

  componentDidMount() {
    this.start();
  }

  start = () => {
    vkService
      .init()
      .then(this.login)
      .then(this.fetchFriends)
      .then(this.fetchPhotos)
      .then(this.parseGeotags)
      .then(this.buildGoogleMap)
      .catch(this.handleError);
  };

  login = () => {
    this.setState({
      pageState: PAGE_STATES.AUTHORIZING,
      pageStateLabel: PAGE_STATES_LABEL.AUTHORIZING
    });

    return vkService.login();
  };

  fetchFriends = () => {
    this.setState({
      pageState: PAGE_STATES.FETCHING_FRIENDS_LIST,
      pageStateLabel: PAGE_STATES_LABEL.FETCHING_FRIENDS_LIST
    });

    return vkService.fetchFriends();
  };

  fetchPhotos = (friendsId) => {
    this.setState({
      pageState: PAGE_STATES.FETCHING_PHOTOS,
      pageStateLabel: PAGE_STATES_LABEL.FETCHING_PHOTOS,
      totalFriendsCount: friendsId.length
    });

    const incrementNumberOfProcessedFriends = () => {
      this.setState(prevState => ({
        ...prevState,
        friendsProcessed: prevState.friendsProcessed + 1
      }));
    };

    const getPhotosPromiseArray = friendsId.map((ownerId, index) =>
      new Promise((resolve) => {
        // Start fetching photos after some delay
        setTimeout(() => {
          vkService
            .fetchFriendPhotos(ownerId)
            .then((photos) => {
              incrementNumberOfProcessedFriends();
              resolve(photos);
            })
            .catch((error) => {
              /* eslint-disable */
                console.error(`Failed to fetch photos for id ${ownerId}. Error code: ${error}`);
              });
          }, index * API_CALL_DELAY);
        })
    );

    return Promise.all(getPhotosPromiseArray);
  };

  parseGeotags = friendsPhotos => {
    this.setState({
      pageState: PAGE_STATES.FETCHING_GEOTAGS,
      pageStateLabel: PAGE_STATES_LABEL.FETCHING_GEOTAGS
    });

    const photosWithGeotags = {};
    friendsPhotos.forEach(photosArray => {
      // Get owner id from any photo from array
      const ownerId = Number(photosArray[0].owner_id);
      // Filter our all photos without geotags and transform the existing data
      const arrayOfGeotags = photosArray
        .filter(photo => photo.lat && photo.long)
        .map(photoWithGeotag => {
          return {
            id: photoWithGeotag.id,
            lat: photoWithGeotag.lat,
            lng: photoWithGeotag.long,
            link: photoWithGeotag.sizes.find(size => size.type === 'q').url
          };
        });

      // The output array can be empty
      if (arrayOfGeotags.length > 0) {
        photosWithGeotags[ownerId] = arrayOfGeotags;
      }
    });

    return photosWithGeotags;
  };

  buildGoogleMap = photosMap => {
    this.setState({
      pageState: PAGE_STATES.DATA_FETCHED,
      photosMap
    });
  };

  handleError = status => {
    /* eslint-disable */
    console.error(`An error has been occured with status ${status}`);

    this.setState({
      pageState: PAGE_STATES.ERROR
    });
  };

  retry = () => {
    this.setState({
      pageState: PAGE_STATES.INITIALIZING,
      pageStateLabel: PAGE_STATES_LABEL.INITIALIZING,
      friendsProcessed: 0,
      totalFriendsCount: 1
    });
    this.start();
  };

  render() {
    const { pageState, pageStateLabel, photosMap } = this.state;

    switch (pageState) {
      case PAGE_STATES.ERROR:
        return <TryAgain onRetryClick={this.retry} />;
      case PAGE_STATES.FETCHING_PHOTOS:
        const { friendsProcessed, totalFriendsCount } = this.state;
        // Normalizing value for progress bar to [0, 100]
        const loaderProgress = (friendsProcessed / totalFriendsCount) * 100;
        return <Loader label={pageStateLabel} value={loaderProgress} />;
      case PAGE_STATES.DATA_FETCHED:
        return <GoogleMapContainer coordinates={photosMap} />;
    }

    return <Loader label={pageStateLabel} />;
  }
}

export default LocateScreenContainer;
