const Book = require('./book');
const BookLocation = require('./booklocation');
const Contact = require('./contact');
const Location = require('./location');


Location.hasMany(Contact, {
    foreignKey: 'locationId',
    onDelete: 'CASCADE'
});

Contact.belongsTo(Location, {
    foreignKey: 'locationId'
});

Contact.hasMany(Book, {
    foreignKey: 'contactId',
    onDelete: 'CASCADE'
});

Book.belongsTo(Contact, {
    foreignKey: 'contactId'
});

Book.belongsToMany(Location, {
    // Define the third table needed to store the foreign keys
    through: {
      model: BookLocation,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'book_locations'
  });
  
Location.belongsToMany(Book, {
    // Define the third table needed to store the foreign keys
    through: {
      model: BookLocation,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'book_locations'
  });


module.exports = { Contact, Location, Book, BookLocation }