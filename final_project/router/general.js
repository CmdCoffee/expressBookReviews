const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if(isbn) {
        if(books[isbn]) {
            const book = books[isbn]
            return res.status(200).json(book)
        } else {
            res.status(404).json({message: "No ISBN match"})
        }
    }
    return res.status(404).json({message: "Please provide ISBN"});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;

    if(author) { 
        const booksKeys = Object.keys(books);
        const booksByAuthorKeys = booksKeys.filter(key => books[key].author === author);
        const booksByAuthor = booksByAuthorKeys.map(key => books[key])
        
        if(booksByAuthor.length > 0) {
            return res.status(200).json(booksByAuthor)
        } else {
            res.status(404).json({message: "No author match"})
        }
    }
    return res.status(404).json({message: "Please provide author"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    if(title) { 
        const booksKeys = Object.keys(books);
        const booksByTitleKeys = booksKeys.filter(key => books[key].title === title);
        const booksByTitle = booksByTitleKeys.map(key => books[key])
        
        if(booksByTitle.length > 0) {
            return res.status(200).json(booksByTitle)
        } else {
            res.status(404).json({message: "No title match"})
        }
    }
    return res.status(404).json({message: "Please provide title"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if(isbn) {
        if(books[isbn]) {
            const reviews = books[isbn].reviews
            return res.status(200).json(reviews)
        } else {
            res.status(404).json({message: "No ISBN match"})
        }
    }
    return res.status(404).json({message: "Please provide ISBN to receive the reviews"});
});

module.exports.general = public_users;
