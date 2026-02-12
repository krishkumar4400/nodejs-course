const { eq } = require("drizzle-orm");
const db = require("../db/index.js");
const booksTable = require("../models/book.model.js");

exports.getAllBooks = async function (req, res) {
  try {
    const books = await db.select().from(booksTable); // return books array
    return res.json({
      books,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getBookById = async function (req, res) {
  try {
    const {bookId} = req.params;
    const [book] = await db
      .select()
      .from(booksTable)
      .where((table) => eq(table.bookId, bookId)).limit(1);
    if (!book) {
      return res.status(401).json({
        message: "Incorrect book id",
        success: false,
      }); // it return array of single element so we will destructure it
    }

    return res.status(200).json({
      book,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.createBook = async function (req, res) {
  try {
    const { title, description, price, authorId } = req.body;
    const [result] = await db.insert(booksTable).values({
      title,
      description,
      price,
      authorId,
    }).returning({bookId: booksTable.bookId});

    return res.status(201).json({
      message: "Book created success",
      success: true,
      bookId: result.bookId
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.deleteBook = async function (req, res) {
  try {
    const {bookId} = req.params;
    await db.delete(booksTable).where(eq(booksTable.bookId, bookId));
    return res.status(401).json({
      message: "Book deleted",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
