const router = require("express").Router();
const { Subject, User, Post } = require("../models");
const withAuth = require("../utils/auth");

/**Get home page and displays all subjects (blogs)**/
router.get("/", async (req, res) => {
  try {
    // Get all subjects and JOIN (include) with user data
    const subjectData = await Subject.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const subjects = subjectData.map((subject) => subject.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      subjects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**Will route over to a specific subject by id number */
router.get("/subject/:id", async (req, res) => {
  try {
    const subjectData = await Subject.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // const postData = await Post.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["name"],
    //     },
    //   ],
    // });
    const subject = subjectData.get({ plain: true });
    // const post = postData.get({ plain: true });

    res.render("subject", {
      // ...post,
      ...subject,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Subject }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login Route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

// testing post logout** added /dashboard
router.post("/dashboard/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
