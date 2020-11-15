import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import { Homepage } from '../../views/Homepage/Homepage';
import { Post } from '../../views/Post/Post';
import { PostEdit } from '../../views/PostEdit/PostEdit';
import { PostAdd } from '../../views/PostAdd/PostAdd';
import { NotFound } from '../../views/NotFound/NotFound';

const Component = ({ className, children, user }) => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      {user === 'user' || user === 'admin' ? (
        <Route exact path="/post/add" component={PostAdd} />
      ) : null}
      <Route exact path="/post/:id" component={Post} />
      {user === 'user' || user === 'admin' ? (
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

const mapStateToProps = (state) => ({
  user: state.user,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Routes,
  Container as Routes,
  Component as RoutesComponent,
};
