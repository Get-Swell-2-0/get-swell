const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postController.js');

// TEST ROUTE TO GET ALL POSTS
router.get('/', postController.getAllPosts, (req, res) => {
  console.log(res.locals.allPosts)
  res.status(200).json(res.locals.allPosts);
});

// GET ALL POSTS BY PREFERENCE
// ADD USER ID as parameter
// fetch will include object of preference properties with each value true or false
// router.get('/:id', postController.getFilteredPosts, (req, res) => {
//   res.status(200).json(res.locals.filteredPosts);
// });

// CREATE NEW POST
router.post('/', postController.createPost, (_, res) => {
  res.status(200).json(res.locals.newPost);
});

// // UPDATE POST - not currently in use.
// router.patch('/:id', postController.updatePost, (_, res) => {
//   res.status(200).json(res.locals.updatedPost);
// });

// DELETE POST
router.delete('/:id', postController.deletePost, (_, res) => {
  res.status(200).json(res.locals.deletedPost);
});

module.exports = router;
