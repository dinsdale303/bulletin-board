import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

import { Button } from '@material-ui/core';

const Component = ({ className, children, user }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Button
        component={NavLink}
        to="/"
        exact
        className={clsx(styles.btn)}
        activeClassName={styles.active}
      >
        Home
      </Button>

      {user === 'user' || user === 'admin' ? (
        <React.Fragment>
          <Button
            component={NavLink}
            to="/post"
            className={clsx(styles.btn)}
            activeClassName={styles.active}
          >
            My Post
          </Button>

          <Button
            component={NavLink}
            to="/post/add"
            className={clsx(styles.btn)}
            activeClassName={styles.active}
          >
            Add Post
          </Button>

          <Button
            component={NavLink}
            to="/logout"
            className={clsx(styles.btn)}
            activeClassName={styles.active}
          >
            {' '}
            Log Out
          </Button>
        </React.Fragment>
      ) : null}

      {user !== 'user' && user !== 'admin' ? (
        <Button
          component={NavLink}
          to="www.google.com"
          className={clsx(styles.btn)}
          activeClassName={styles.active}
        >
          {' '}
          Log In with Google
        </Button>
      ) : null}

    </div>
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
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
