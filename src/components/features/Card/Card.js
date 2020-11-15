import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Card.module.scss';

import { Link } from 'react-router-dom';
import { MenuBtn } from '../MenuBtn/MenuBtn';

import {
  Card,
  CardHeader,
  Avatar,
  Button,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Component = ({ className, children, post}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {
    user,
    isAuthenticated,
    // isLoading,
  } = useAuth0();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Card key={post._id} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={post.user.avatar} />
          }
          action={
            <div className={clsx(styles.priceSettings)}>
              <Typography variant="body1">{post.price}</Typography>
              {isAuthenticated || user === 'admin' ? (
                <MenuBtn postId={post._id}/>
              ) : null}
            </div>
          }
          title={post.title}
          subheader={post.updated}
        />
        <CardMedia className={classes.media} image={post.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.outline}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            component={Link}
            to={'/post/' + post._id}
            aria-label="add to favorites"
          >
            Go to this post
          </Button>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.content}</Typography>
            <Typography paragraph>author: {post.author}</Typography>
            <Typography paragraph>email: {post.email}</Typography>
            <Typography paragraph>phone nr.: {post.phoneNr}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
};

// const mapStateToProps = state => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps)(Component);

export {
  Component as Card,
  // Container as Card,
  Component as CardComponent,
};
