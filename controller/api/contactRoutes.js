const router = require('express').Router();
const { Contact } = require('../../models');

router.post('/', async (req, res) => {
    try {
    // creates contact
    const contactData = await book.create(req.body);
    
        // saves book into contact id 
        req.session.save(() => {
            req.session.book_id = contactData.id;
            req.session.logged_in = true;
    
            res.status(200).json(contactData);
        });
        } catch (err) {
        res.status(400).json(err);
        }
    });
  
module.exports = router;