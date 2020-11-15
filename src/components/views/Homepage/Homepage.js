import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

import { Card } from '../../features/Card/Card';

const Component = ({ className, children, postsData }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Homepage</h2>
      {postsData.map((post) => (
        <Card key={post.id} post={post}/>
      ))}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postsData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  postsData: state.posts.data,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
