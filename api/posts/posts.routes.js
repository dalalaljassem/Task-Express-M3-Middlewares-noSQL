const express = require("express");
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
} = require("./posts.controllers");

//middleware
router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const error = new Error("ERROR 404! - better luck next time bruh");
    error.status = 404;
    next(error);
  }
});

router.get("/", postsGet);
router.get("/", fetchPost);
router.post("/", postsCreate);

router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);

module.exports = router;
