const router = require('express').Router();
const { Book } = require('../../models');
 
router.get('/', async (req, res) => {
  Book.findAll({})
  .then(
    book => res.json(book)
  ).catch( err => res.json(err))
})

router.post('/', async (req, res) => {
 try {
   // creates book
   const bookData = await book.create(req.body);
  
   req.session.save(() => {
     req.session.book_id = bookData.id;
     req.session.logged_in = true;
 
     res.status(200).json(bookData);
   });
 } catch (err) {
   res.status(400).json(err);
 }
});
 
router.post('/login', async (req, res) => {
 try {
   const bookData = await Book.findOne({
     where: { isbn: req.body.isbn }
   });
 
   if (!bookData) {
     res
       .status(400)
       .json({ message: 'No book found with this ISBN' });
     return;
   }
 
   req.session.save(() => {
     req.session.contact_id = contactData.id;
     req.session.logged_in = true;
    
     res.json({ contact: contactData, message: 'You are now logged in!' });
   });
 
 } catch (err) {
   res.status(400).json(err);
 }
});
 
router.post('/logout', (req, res) => {
 if (req.session.logged_in) {
   req.session.destroy(() => {
     res.status(204).end();
   });
 } else {
   res.status(404).end();
 }
});
 
 
// need to apply res.render('all'); to apply to handlebar.js?
module.exports = router;
