const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// router.post ('/:id) does help get data into the server.
router.post("/:id", withAuth, async (req, res) => {
  console.log("\ngot to here : subjectRoutes line 6\n");
  try {
    // trying to get subject_id to have data
    // subject.id does not work,
    // req.session.subject_id does not work, keep getting undefined
    // just need the subject_id to get to the comment table
    // req.params.subject_id comin up null in dev tools/  undefined in CLI
    // req.session.subject_id undefined in CLI
    // req.session.id grabs the session id instead, ( very long string of random chars)


    //If subject_id is req.params.id , we get POST http://localhost:3001/api/subject/null 400

    //IF subject_id is req.session.subject_id, we get GET http://localhost:3001/subject/null 500 (Internal Server Error)
    console.log("\n attempting to create comment\n ");
    const newComment = await Comment.create({
      ...req.body,
      // user_id: req.session.user_id,
      subject_id: req.params.id,
    });
    console.log(`\n I am a console log of the newComment below`);
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(`\nHere is the Error: `);
    console.log(err);
    res.status(400).json(err);
  }
});
module.exports = router;
