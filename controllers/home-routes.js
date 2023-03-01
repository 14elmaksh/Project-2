const router = require('express').Router();
const { Book, BookLocation, Contact, Location } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Location,
          through: BookLocation, 
          as: "book_locations"
        },
      ]
    });

    const books = bookData.map((book) => book.get({ plain: true }));
      console.log(JSON.stringify(books,null,2))
    res.render('homepage', { 
      books, 
      logged_in: req.session.logged_in,
      layout: 'main'
    }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
);

router.get('/buttonpage', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Location,
          through: BookLocation, 
          as: "book_locations"
        },
      ]
    });

    const books = bookData.map((book) => book.get({ plain: true }));
      console.log(JSON.stringify(books,null,2))
    res.render('buttonpage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/buyerpage', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Location,
          through: BookLocation, 
          as: "book_locations"
        },
      ]
    });

    const books = bookData.map((book) => book.get({ plain: true }));
      console.log(JSON.stringify(books,null,2))
    res.render('buyerpage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/sellerpage', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Location,
          through: BookLocation, 
          as: "book_locations"
        },
      ]
    });

    const books = bookData.map((book) => book.get({ plain: true }));
      console.log(JSON.stringify(books,null,2))
    res.render('sellerpage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// re-writing the homepage to do a search
// GET /search/:isbn
router.get('/search', async (req, res) => {
  console.log(req.query.q);
  try {
    const bookData = await Book.findAll({
      where: {
        [Op.or]: [
          { 
            title: {
              [Op.regexp]: req.query.q
            }
          },{ 
            author: {
              [Op.regexp]: req.query.q
            }
          },
          {
            isbn: { 
              [Op.regexp]: req.query.q 
            }
          }
        ]
      },
      order: [
        // ASC or DESC for the second value
        ['title', 'ASC'],
      ],
    });

    // Serialize data so the template can read it
    const books = bookData.map((location) => location.get({ plain: true }));
    console.log(JSON.stringify(books,null,2))
    // Pass serialized data and session flag into template
    res.render('buyerpage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          attributes: ['title'],
        },
      ],
    });

    const book = bookData.get({ plain: true });

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
