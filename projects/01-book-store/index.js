require('dotenv/config');
const express = require('express');


const app = express();
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});