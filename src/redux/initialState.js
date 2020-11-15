export const initialState = {
  user: '',
  posts: {
    allPosts: [],
    allPostsLoaded: false,
    myPosts: [],
    myPostsLoaded: false,
    loading: {
      active: false,
      error: false,
    },
  },
};
