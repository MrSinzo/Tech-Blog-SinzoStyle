const router = require('express').Router();
const { Post, Subject, User } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/subject/:id', withAuth, async (req, res) => {
  console.log("got to here : subjectRoutes line 6")
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;