const sequelize = require('../config/connection');
const { Book, Location, Contact, BookLocation } = require('../models');

const bookData = require('./bookData.json');
const locationData = require('./locationData.json');
const contactData = require('./contactData.json');
const bookLocationData = require('./bookLocationData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const locations = await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });
  const contacts= await Contact.bulkCreate(contactData, {
    individualHooks: true,
    returning: true,
  });
  const books = await Book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });
  const bookLocation = await BookLocation.bulkCreate(bookLocationData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();


