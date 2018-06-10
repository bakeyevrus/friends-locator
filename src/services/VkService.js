import config from '../config';

/** Wrapper class converting VK callback API into promise based */
const VkServiceFactory = () => {
  const { VK } = window;
  if (!VK) {
    throw new Error("'VK' object is not defined in window");
  }

  // Wrap with promise for code consistency and promise chain support
  const init = () => Promise.resolve(VK.init({ apiId: config.VK_API_KEY }));

  const login = () => {
    // Friends and photos access mask
    const settings = 0b110;
    return new Promise((resolve, reject) => {
      VK.Auth.login(
        response =>
          (response.status === 'connected' ? resolve(response.session) : reject(response.status)),
        settings
      );
    });
  };

  const fetchFriends = () => {
    const findActiveFriends = friendsList =>
      friendsList.filter(friend => !friend.deactivated).map(friend => friend.id);

    return new Promise((resolve, reject) => {
      VK.Api.call(
        'friends.get',
        {
          return_system: 0,
          // Leave this field to obtain detailed response from the server
          fields: 'city',
          v: config.VK_API_VERSION,
          count: config.VK_MAX_FRIENDS_TO_FETCH || 5000
        },
        (r) => {
          if (r.response) {
            resolve(r.response.items);
          } else {
            reject(r.error.error_code);
          }
        }
      );
    }).then(findActiveFriends);
  };

  const fetchFriendPhotos = ownerId =>
    new Promise((resolve, reject) => {
      VK.Api.call(
        'photos.getAll',
        {
          owner_id: ownerId,
          extended: 0,
          count: 200,
          v: config.VK_API_VERSION
        },
        (r) => {
          if (r.response) {
            resolve(r.response.items);
          } else {
            reject(r.error.error_code);
          }
        }
      );
    });

  return {
    init,
    login,
    fetchFriends,
    fetchFriendPhotos
  };
};

const vkServiceFactory = VkServiceFactory();
export default vkServiceFactory;
