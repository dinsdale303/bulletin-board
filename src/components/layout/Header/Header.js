import React from 'react';
import PropTypes from 'prop-types';

import { useAuth0 } from '@auth0/auth0-react';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

import { Button } from '@material-ui/core';

const Component = ({ className, children }) => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    // isLoading,
  } = useAuth0();

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

      {isAuthenticated  || user === 'admin' ? (
        <React.Fragment>
          <Button
            component={NavLink}
            to={'/post/myposts'}
            className={clsx(styles.btn)}
            activeClassName={styles.active}
          >
            My Posts
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
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            {' '}
            Log Out
          </Button>
        </React.Fragment>
      ) : null}

      {!isAuthenticated  ? (
        <Button
          component={NavLink}
          to="/"
          className={clsx(styles.btn)}
          activeClassName={styles.active}
          onClick={() => loginWithRedirect()}
        >
          Log In
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

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
