import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getMyPosts, fetchMyPosts } from '../../../redux/postsRedux';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './MyPosts.module.scss';

import { Card } from '../../features/Card/Card';

const Component = ({ className, children, posts, fetch }) => {
  const {
    user,
  } = useAuth0();

  useEffect(() => {
    fetch(user.sub.split('|')[1]);
  }, [fetch, user]);

  return (
    <div className={clsx(className, styles.root)}>
      {posts.map((post) => (
        <Card key={post._id} post={post}/>
      ))}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  fetch: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getMyPosts(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: (userId) => dispatch(fetchMyPosts(userId)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
