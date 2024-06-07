const { StatusCodes } = require("http-status-codes");
const Post = require("../model/post");

const CreatePost = async (req, res) => {
  try {
    // Get the title, description, and image from the request body
    const { title, description, image } = req.body;

    // Construct the object for post data
    const postData = {
      title: title,
      description: description,
      image: image,
    };

    // Create a new post with the post data
    const post = new Post(postData);

    // Save the post
    await post.save();

    // Send a response to the client
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post created successfully", post: post });
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
    const UpdatePost = await Post.findByIdAndUpdate(postId, req.body);
    if (!UpdatePost) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Post updated successfully", post: UpdatePost });
  } catch (error) {
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
