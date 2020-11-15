import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneById } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';


import { MenuBtn } from '../../features/MenuBtn/MenuBtn';

import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const Component = ({ className, children, post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={clsx(className, styles.root)}>
      <Card key={post.id} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <div className={clsx(styles.priceSettings)}>
              <Typography variant="body1">{post.price}</Typography>
              <MenuBtn postId={post.id} />
            </div>
          }
          title={post.title}
          subheader={post.publishDate}
        />
        <CardMedia className={classes.media} image={post.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.outline}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
          </IconButton>
        </CardActions>

        <CardContent>
          <Typography paragraph>{post.content}</Typography>
          <Typography paragraph>author: {post.author}</Typography>
          <Typography paragraph>email: {post.email}</Typography>
          <Typography paragraph>phone nr.: {post.phoneNr}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  }
) => ({
  post: getOneById(state, id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
