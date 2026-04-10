import express from "express";
import 'dotenv/config';

const app = express();

app.get('/', (req,res) => {
    return res.send("Hello Express");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});