import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.allPosts;
export const getMyPosts = ({ posts }) => posts.myPosts;
export const getAllPublished = ({ posts }) =>
  posts.allPosts.filter((post) => post.status === 'published');
export const getOneById = ({ posts }, id) =>
  posts.allPosts.find((post) => post._id === id);

/* action name creator */
const reducerName = 'posts';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const POST_START = createActionName('POST_START');
const POST_SUCCESS = createActionName('POST_SUCCESS');
const FETCH_MY_POSTS_SUCCESS = createActionName('FETCH_MY_POSTS_SUCCESS');
const POST_ERROR = createActionName('POST_ERROR');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchMyPostsSuccess = (payload) => ({
  payload,
  type: FETCH_MY_POSTS_SUCCESS,
});
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

export const postStarted = (payload) => ({ payload, type: POST_START });
export const postSuccess = (payload) => ({ payload, type: POST_SUCCESS });
export const postError = (payload) => ({ payload, type: POST_ERROR });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    if (!getState().posts.allPostsLoaded) {
      dispatch(fetchStarted());

      Axios.get('http://localhost:8000/api/posts')
        .then((res) => {
          dispatch(fetchSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchMyPosts = (userId) => {
  return (dispatch, getState) => {
    if (!getState().posts.myPostsLoaded) {
      dispatch(fetchStarted());

      Axios.get('http://localhost:8000/api/posts/myposts/' + userId)
        .then((res) => {
          dispatch(fetchMyPostsSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const publishNewPost = (data) => {
  return (dispatch, getState) => {
    dispatch(postStarted());

    Axios.post('http://localhost:8000/api/posts', data)
      .then((res) => {
        dispatch(postSuccess(res.data));
      })
      .catch((err) => {
        dispatch(postError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        allPosts: action.payload,
        allPostsLoaded: true,
      };
    }
    case FETCH_MY_POSTS_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        myPosts: action.payload,
        myPostsLoaded: true,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case POST_START: {
      return {
        ...statePart,
        sending: {
          active: true,
          error: false,
        },
      };
    }
    case POST_SUCCESS: {
      return {
        ...statePart,
        sending: {
          active: false,
          error: false,
        },
        allPosts: [action.payload, ...statePart.allPosts],
        myPosts: [action.payload, ...statePart.myPosts],
      };
    }
    case POST_ERROR: {
      return {
        ...statePart,
        sending: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
