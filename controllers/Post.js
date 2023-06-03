import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const { post, photo } = req.body;

    // create a new instance of the Post model with the received data
    const newPost = new Post({
      user: req.user.id,
      post,
      photo,
    });

    // save the new post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    // find the post
    const post = await Post.findById(req.params.id);

    // if the post does not exist
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // if the user is not the creator of the post
    if (post.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    // delete the post
    await Post.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // if the post does not exist
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // if the user is not the creator of the post
    if (post.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ error: "You can only update your own posts" });
    }

    // update the post, returns a modified "new" post instead of the original
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
    next(error);
  }
};
