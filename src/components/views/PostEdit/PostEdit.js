import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneById } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostEdit.module.scss';

import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  CardMedia,
  CardContent,
  TextField,
} from '@material-ui/core';
import ImageUploader from 'react-images-upload';

class Component extends React.Component {
  state = {
    post: {
      title: this.props.post.title,
      price: this.props.post.price,
      email: this.props.post.email,
      content: this.props.post.content,
      outline: this.props.post.outline,
      phoneNr: this.props.post.phoneNr,
      file: null,
    },
    error: null,
  };

  handleChange = ({ target }) => {
    const { post } = this.state;
    const { value, name } = target;

    this.setState({ post: { ...post, [name]: value } });
  };

  setPhoto = (files) => {
    const { post } = this.state;

    if (files) this.setState({ post: { ...post, file: files[0] } });
    else this.setState({ post: { ...post, file: null } });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const classes = {};
    const { handleChange, setPhoto } = this;
    const {
      title,
      email,
      price,
      content,
      outline,
      phoneNr,
      file,
    } = this.state.post;
    return (
      <div className={clsx(this.props.className, styles.root)}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={styles.avatar}>
                R
              </Avatar>
            }
            action={
              <div className={clsx(styles.priceSettings)}>
                <TextField
                  label="Price"
                  value={price}
                  name="price"
                  size="small"
                  onChange={handleChange}
                />
              </div>
            }
            title={
              <TextField
                label="Title"
                size="small"
                value={title}
                name="title"
                onChange={handleChange}
              />
            }
            subheader={this.props.post.publishDate}
          />

          <ImageUploader
            withIcon={false}
            buttonText="Choose image"
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            onChange={setPhoto}
            singleImage={true}
            className={file ? 'hide' : 'animated fadeInUp'}
          />
          {file ? null : (
            <CardMedia className={styles.media} image={this.props.post.image} />
          )}
          <CardContent className={clsx(styles.cardContent)}>
            <TextField
              label="Outline"
              size="small"
              value={outline}
              name="outline"
              onChange={handleChange}
            />

            <TextField
              label="Content"
              multiline
              rows={6}
              size="small"
              variant="outlined"
              value={content}
              name="content"
              onChange={handleChange}
            />
            <Typography paragraph>author: {this.props.post.author}</Typography>
            <TextField
              label="e mail"
              size="small"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Phone nr"
              size="small"
              value={phoneNr}
              name="phoneNr"
              onChange={handleChange}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

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
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
