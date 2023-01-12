const router = require('express').Router();
const { Subject, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all subjects and JOIN with user data
    const subjectData = await Subject.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const subjects = subjectData.map((subject) => subject.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      subjects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;