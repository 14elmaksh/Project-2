DROP DATABASE IF EXISTS book_db;
CREATE DATABASE book_db;

USE book_db;

CREATE TABLE book (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  book_title VARCHAR(100) NOT NULL,
  book_price DECIMAL NULL,
  isbn_number INT NOT NULL,
  
);

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
);
