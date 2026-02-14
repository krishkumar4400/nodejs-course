const express = require('express');
const db = require('../db/index.js');
const booksTable = require('../models/book.model.js');
const { describe } = require('node:test');

const bookRouter = express.Router();

// get all books
bookRouter.get('/books', (req,res) => {
    const books = db.select({ title, description }).from(booksTable);
})

module.exports = bookRouter;