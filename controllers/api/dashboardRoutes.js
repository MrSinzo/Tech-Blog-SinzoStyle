const router = require('express').Router();
const { Subject } = require('../../models');
const withAuth = require('../../utils/auth');
/*********************************************/
/****************Delete***********************/
/*********************************************/
router.delete('/subject/:id',withAuth, async (req, res) => {
  console.log("Got route")
  try {
    const subjectData = await Subject.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
// if no subject ( or blog) is found, return err
    if (!subjectData) {
      res.status(404).json({ message: 'No subject found with this id!' });
      return;
    }

    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});
/*********************************************/
/****************UpDate***********************/
/*********************************************/
router.post('/subject', withAuth, async (req, res) => {
  console.log("got here")
  try {
    const newSubject = await Subject.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newSubject);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;