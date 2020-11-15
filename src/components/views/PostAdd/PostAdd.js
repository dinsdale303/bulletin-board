import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { publishNewPost } from '../../../redux/postsRedux';
import { withAuth0 } from '@auth0/auth0-react';

import styles from './PostAdd.module.scss';

import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import ImageUploader from 'react-images-upload';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      price: '',
      email: '',
      content: '',
      outline: '',
      phone: '',
      image: '',
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
    const { user, isAuthenticated } = this.props.auth0;
    const classes = {};
    const { handleChange, setPhoto } = this;
    const {
      image,
      title,
      email,
      price,
      content,
      outline,
      phone,
      file,
    } = this.state.post;
    return (
      <div className={clsx(this.props.className, styles.root)}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={styles.avatar}
                src={user.picture}
              />
            }
            action={
              <div className={clsx(styles.priceSettings)}>
                <TextField
                  label="Price"
                  value={price}
                  name="price"
                  type="number"
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
            subheader={'this date'}
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
          <CardContent className={clsx(styles.cardContent)}>
            <TextField
              label="Image URL"
              size="small"
              type="url"
              value={image}
              name="image"
              onChange={handleChange}
            />
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
            <Typography paragraph>
              author: {isAuthenticated ? user.name : null}
            </Typography>
            <TextField
              label="e mail"
              size="small"
              value={email}
              type="email"
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Phone nr"
              size="small"
              value={phone}
              name="phone"
              type="tel"
              onChange={handleChange}
            />
          </CardContent>
        </Card>
        <Button onClick={() => this.props.publish(this.state.post, user)}>
          Publish post
        </Button>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  publish: PropTypes.func,
  auth0: PropTypes.object,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = (dispatch) => ({
  publish: (newPost, user) => dispatch(publishNewPost({post: newPost, user: user})),
});

const Container = withAuth0(connect(null, mapDispatchToProps)(Component));

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
