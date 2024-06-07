const express = require("express");
const postController = require("../controller/post.controller");

const router = express.Router();

// Create a new post
router.post("/createpost", postController.CreatePost);

// Get all posts
router.get("/getposts", postController.GetPosts);

// Get a post by id
router.get("/getpost/:id", postController.GetPost);

// Update a post by id
router.put("/updatepost/:id", postController.UpdatePost);

// Delete a post by id
router.delete("/deletepost/:id", postController.DeletePost);

module.exports = router;
