const express = require("express");
const { auth } = require("../middleware/auth");
const { postModel } = require("../Model/PostModel");
const postRoute = express.Router();

postRoute.use(auth);
postRoute.post("/api/posts", async (req, res) => {
  const { user_Id, title, category, media, content } = req.body;

  try {
    const post = new postModel({
      user_Id: req.user_Id,
      title,
      category,
      media,
      content,
    });
    await post.save();
    res.status(201).json({ msg: "Post is added", post });
  } catch (error) {
    res.status(500).json({ msg: "post is Not added" });
  }
});

postRoute.get("/api/posts", async (req, res) => {
  const { title, category } = req.query;
  console.log(title, category, "query");
  const filter = {};
  if (title) {
    filter.title = { $regex: new RegExp(title, "i") };
  }

  if (category) {
    filter.category = category;
  }
  try {
    const post = await postModel.find(filter);
    res.status(200).json({ msg: "This are all post", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//SinglePost

postRoute.get("/api/posts/:post_id", async (req, res) => {
  const id = req.params.post_id;
  console.log(id);
  try {
    const post = await postModel.findById(id); // Assuming you have a findById method in your post model
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json({ msg: "This is the post", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRoute.patch("/api/posts/:post_id", async (req, res) => {
  // console.log(req.params, "paramsobj");
  const id = req.params.post_id;
  console.log(id, "editId");
  const updatePost = req.body;
  console.log(updatePost);
  try {
    const singlePost = await postModel.findByIdAndUpdate(
      { _id: id },
      updatePost,
      { new: true }
    );

    if (!singlePost) {
      res.status(400).json({ msg: "blogs not updated" });
    }
    res.status(204).json({ mag: `product Updated now of ${id}!`, singlePost });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

postRoute.delete("/api/posts/:post_id", async (req, res) => {
  const id = req.params.post_id;
  console.log(id);

  const postTitle = req.body.title;
  console.log(postTitle);

  try {
    const deletePost = await postModel.findByIdAndDelete({
      _id: id,
      postTitle,
    });
    if (!deletePost) {
      res.status(400).json({ msg: "post not deleted" });
    }
    res.status(202).json({ mag: `product Deleted now of  ${id}!`, deletePost });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = {
  postRoute,
};
