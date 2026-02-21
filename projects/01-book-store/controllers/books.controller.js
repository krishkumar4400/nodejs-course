const booksTable = require("../model/books.js");
const db = require("../db/index.js");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  try {
    const books = await db.select().from(booksTable);
    return res.json({ books });
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
    const { id } = req.params;
    const [book] = await db
      .select()
      .from(booksTable)
      .where((table) => eq(table.id, id))
      .limit(1);

    if (!book) {
      return res.status(404).json({
        error: `Book with id ${id} does not exists!`,
      });
    }

    return res.status(200).json({
      book,
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
    const { title, description, authorId } = req.body;
    if (!title || title === "") {
      return res.status(400).json({
        message: "Title is required",
        success: false,
      });
    }

    const [result] = await db
      .insert(booksTable)
      .values({ title, description, authorId })
      .returning({
        id: booksTable.id,
      });

    return res.status(201).json({
      message: "Book Created Success",
      success: true,
      id: result.id,
    });
  } catch (error) {
    console.error(error.message);
    return res.status.json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.deleteBook = async function (req, res) {
  try {
    const { id } = req.params;
    await db.delete(booksTable).where(eq(booksTable.id, id));
    return res.status(200).json({
      message: "Book Deleted",
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
