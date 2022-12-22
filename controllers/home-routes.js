const router = require('express').Router();
const { Book, BookLocation, Contact, Location } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Book,
          attributes: ['title'],
        },
        {
          model: Location,
          attributes: ['title', 'location'], // specifying columns
          through: BookLocation, 
          as: "book_location"
        },
      ],
    });

    const locations = locationData.map((location) => location.get({ plain: true }));

    res.render('homepage', { 
      locations, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// re-writing the homepage to do a search
// GET /search/:isbn
router.get('/search/:isbn', async (req, res) => {
  console.log(req.params.isbn);
  try {
    const bookData = await book.findAll({
      where: {
        [Op.or]: [
          { 
            title: {
              [Op.regexp]: req.params.isbn
            }
          },{ 
            description: {
              [Op.regexp]: req.params.isbn
            }
          },
          {
            '$User.name$': { 
              [Op.regexp]: req.params.isbn 
            }
          }
        ]
      },
      order: [
        // ASC or DESC for the second value
        ['title', 'ASC'],
      ],
      include: [
        {
          model: Book,
          attributes: ['title'],
        },
      ],
    });

    // Serialize data so the template can read it
    const locations = locationData.map((location) => location.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      locations, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          attributes: ['title'],
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
