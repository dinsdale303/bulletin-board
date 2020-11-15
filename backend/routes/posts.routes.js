const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');
const User = require('../models/user.model');

router.post('/posts', async (req, res) => {
  try {
    const isAlphabetic = new RegExp('([A-z]|\\s|\\.)+');
    const isNumeric = new RegExp('[0-9]+(\\.|,)?[0-9]?[0-9]?');
    const pattern = new RegExp(/(<\s*(strong|em)*>(([A-z]|\s)*)<\s*\/\s*(strong|em)>)|(([A-z]|\s|\.)*)/, 'g');
    const contentMatched = req.body.post.content.match(pattern).join('');
    if(contentMatched.length < req.body.post.content.length) {
      res.status(422);
      throw new Error('Invalid content...');
    }
    const outlineMatched = req.body.post.content.match(pattern).join('');
    if(outlineMatched.length < req.body.post.outline.length) {
      res.status(422);
      throw new Error('Invalid outline...');
    }
    if (
      !isAlphabetic.test(req.body.post.title)
    ) {
      res.status(422);
      throw new Error('Invalid title...');
    }
    if (
      !isNumeric.test(req.body.post.price)
    ) {
      res.status(422);
      throw new Error('Invalid price...');
    }
    if (
      !req.body.post.title ||
      !req.body.post.outline ||
      !req.body.post.content ||
      !req.body.post.price ||
      !req.body.post.image
    ) {
      res.status(422);
      throw new Error('Empty input!');
    }
    const [subFrom, subId] = req.body.user.sub.split('|');
    let user = await User.findOne({ subId: subId });
    if (!user) {
      user = new User({
        name: req.body.user.name,
        nickname: req.body.user.nickname,
        email: req.body.user.email,
        avatar: req.body.user.picture,
        subId: subId,
        subFrom: subFrom,
      });
      await user.save();
    }
    const newPost = new Post({
      user: user._id,
      author: req.body.user.name,
      email: req.body.post.email || user.email,
      status: req.body.post.status || 'published',
      title: req.body.post.title,
      outline: req.body.post.outline,
      content: req.body.post.content,
      image: req.body.post.image,
      price: req.body.post.price,
      phone: req.body.post.phone || null,
      location: req.body.post.location || null,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    if (!res.status) {
      res.status(500);
    }
    res.json(err.message);
  }
});

router.get('/posts', async (req, res) => {
  try {
    const result = await Post.find({ status: 'published' })
      .populate('user')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/myposts/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ subId: req.params.userId });
    const result = await Post.find({ user: user._id })
      .populate('user')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
