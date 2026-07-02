import express from 'express';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
})

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})