const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register endpoint
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});



// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(300).json(books);
});


public_users.get('/async', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (isbn) {
        if (books[isbn]) {
            const book = books[isbn]
            return res.status(200).json(book)
        } else {
            return res.status(404).json({ message: "No ISBN match" })
        }
    }
    return res.status(404).json({ message: "Please provide ISBN" });
});

// Get book details based on ISBN (Async/Await)
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;
        const isbn = req.params.isbn;

        if (isbn) {
            if (books[isbn]) {
                const book = books[isbn]
                return res.status(200).json(book)
            } else {
                return res.status(404).json({ message: "No ISBN match" })
            }
        }
        return res.status(404).json({ message: "Please provide ISBN" });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    if (author) {
        const booksKeys = Object.keys(books);
        const booksByAuthorKeys = booksKeys.filter(key => books[key].author === author);
        const booksByAuthor = booksByAuthorKeys.map(key => books[key])

        if (booksByAuthor.length > 0) {
            return res.status(200).json(booksByAuthor)
        } else {
            return res.status(404).json({ message: "No author match" })
        }
    }
    return res.status(404).json({ message: "Please provide author" });
});

// Get book details based on author (Async/Await)
public_users.get('/author/:author', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;
        const author = req.params.author;

        if (author) {
            const booksKeys = Object.keys(books);
            const booksByAuthorKeys = booksKeys.filter(key => books[key].author === author);
            const booksByAuthor = booksByAuthorKeys.map(key => books[key])

            if (booksByAuthor.length > 0) {
                return res.status(200).json(booksByAuthor)
            } else {
                return res.status(404).json({ message: "No author match" })
            }
        }
        return res.status(404).json({ message: "Please provide author" });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    if (title) {
        const booksKeys = Object.keys(books);
        const booksByTitleKeys = booksKeys.filter(key => books[key].title === title);
        const booksByTitle = booksByTitleKeys.map(key => books[key])

        if (booksByTitle.length > 0) {
            return res.status(200).json(booksByTitle)
        } else {
            return res.status(404).json({ message: "No title match" })
        }
    }
    return res.status(404).json({ message: "Please provide title" });
});

// Get all books based on title (Async/Await)
public_users.get('/title/:title', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;
        const title = req.params.title;

        if (title) {
            const booksKeys = Object.keys(books);
            const booksByTitleKeys = booksKeys.filter(key => books[key].title === title);
            const booksByTitle = booksByTitleKeys.map(key => books[key])

            if (booksByTitle.length > 0) {
                return res.status(200).json(booksByTitle)
            } else {
                return res.status(404).json({ message: "No title match" })
            }
        }
        return res.status(404).json({ message: "Please provide title" });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    try {
        const isbn = req.params.isbn;

        if (isbn) {
            if (books[isbn]) {
                const reviews = books[isbn].reviews
                return res.status(200).json(reviews)
            } else {
                return res.status(404).json({ message: "No ISBN match" })
            }
        }
        return res.status(404).json({ message: "Please provide ISBN to receive the reviews" });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

module.exports.general = public_users;
