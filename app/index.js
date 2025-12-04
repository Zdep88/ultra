import 'dotenv/config';
import express from 'express';
import routerBack from './routerBack.js';
import routerFront from './routerFront.js';

const app = express();
const port = process.env.PORT;

app.use('/api', routerBack);
app.use('/', routerFront);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});