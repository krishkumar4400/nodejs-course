const express = require('express');

const app = express();

// middlewares
app.use(express.json());

// In Memory DB
const books = [
    {
        id: 1,
        title: "Book One",
        author: "Author One"
    },
    {
        id: 2,
        title: "Book Two",
        author: "Author One"
    },
    {
        id: 3,
        title: "Book Three",
        author: "Author Two"
    },
    {
        id: 4,
        title: "Book Four",
        author: "Author Two"
    },
];

// routes
app.get('/', (req,res) => {
    res.send("Hello express"); 
});

app.get('/books', (req,res) => {
    res.json(books);
});

app.get('/books/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => (book.id === id));
    return res.json(book);
});

app.post('/book', (req,res) => {
    const {title, author} = req.body;
    console.log(req.body);
    const book = {
        id: books.length + 1,
        title,
        author 
    };
    books.push(book);
    console.log(book);

    return res.json({
        message: "New Book Added",
        success: true 
    });

})

app.listen(8000, () => {
    console.log(`server is up and running on http://localhost:8000`);
});