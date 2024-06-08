const { StatusCodes } = require("http-status-codes");
const Post = require("../model/post");
const fs = require("fs");
const path = require("path");

const CreatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = path.join("uploads", req.file.filename);
    }

    const postData = {
      title,
      description,
      image: imagePath,
    };

    const post = new Post(postData);
    await post.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post created successfully", post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const GetPosts = async (req, res) => {
  try {
    // Get all posts
    const posts = await Post.find();

    // Send a response to the client
    res.status(StatusCodes.OK).json({ posts: posts });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const GetPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
    }
    res.status(StatusCodes.OK).json({ post: post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const UpdatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = req.body;

    // Check if a new image file is provided
    if (req.file) {
      // If a new image is provided, update the image field
      postData.image = req.file; // Update the image field with the new path
    }

    // Find the post by ID and update with the new data
    const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true, // Return the updated document
    });

    if (!updatedPost) {
      // If no post is found with the given ID
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }

    // Respond with the updated post data
    res.status(StatusCodes.OK).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    // Handle errors
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Post deleted successfully", post: post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = { CreatePost, GetPosts, GetPost, UpdatePost, DeletePost };
