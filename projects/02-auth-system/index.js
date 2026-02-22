import 'dotenv/config';
import express from 'express';
import userRouter from './routes/user.js';

const app = express();
const port = process.env.PORT ?? 8001;


app.get('/', (req,res) => {
    return res.status(200).json({
        message: "Hello Express"
    })
});

// middlewares
app.use(express.json());
app.use('/api/auth', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});