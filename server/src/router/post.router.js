const express = require("express");
const postController = require("../controller/post.controller");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/createpost", upload.single("image"), postController.CreatePost);

// Get all posts
router.get("/getposts", postController.GetPosts);

// Get a post by id
router.get("/getpost/:id", postController.GetPost);

// Update a post by id
router.put(
  "/updatepost/:id",
  postController.upload.single("image"), // Use multer middleware to handle single file upload
  postController.UpdatePost
);
// Delete a post by id
router.delete("/deletepost/:id", postController.DeletePost);

module.exports = router;
