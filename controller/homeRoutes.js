const router = require('express').Router();
const { Project, ProjectTag, Tag, User } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Tag,
          attributes: ['name', 'location'], // specifying columns
          through: ProjectTag, 
          as: "related_tags"
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    // projects.forEach(project => {
    //   project.related_tags.forEach(tag => {
    //     // can access tag.name from here
    //     console.log(tag.name);
    //   });
    // });
    // console.log(JSON.stringify(projects, null, 2));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// re-writing the homepage to do a search
// GET /search/:term
router.get('/search/:term', async (req, res) => {
  console.log(req.params.term);
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      where: {
        [Op.or]: [
          { 
            description: {
              [Op.regexp]: req.params.term
            }
          },{ 
            name: {
              [Op.regexp]: req.params.term
            }
          },
          {
            '$User.name$': { 
              [Op.regexp]: req.params.term 
            }
          }
        ]
      },
      order: [
        // ASC or DESC for the second value
        ['name', 'ASC'],
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
