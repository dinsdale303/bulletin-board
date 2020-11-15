import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import { Homepage } from '../../views/Homepage/Homepage';
import { Post } from '../../views/Post/Post';
import { PostEdit } from '../../views/PostEdit/PostEdit';
import { PostAdd } from '../../views/PostAdd/PostAdd';
import { MyPosts } from '../../views/MyPosts/MyPosts';
import { NotFound } from '../../views/NotFound/NotFound';

const Component = ({ className, children }) => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      {isAuthenticated || user === 'admin' ? (
        <Route exact path="/post/add" component={PostAdd} />
      ) : null}
      {isAuthenticated || user === 'admin' ? (
        <Route exact path="/post/myposts" component={MyPosts} />
      ) : null}
      <Route exact path="/post/:id" component={Post} />
      {isAuthenticated || user === 'admin' ? (
        <Route exact path="/post/:id/edit" component={PostEdit} />
      ) : null}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.string,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps)(Component);

export {
  Component as Routes,
  // Container as Routes,
  Component as RoutesComponent,
};
