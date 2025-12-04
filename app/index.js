import 'dotenv/config';
import express from 'express';
import routerBack from './routerBack.js';
import routerFront from './routerFront.js';

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('public'));
app.use(express.json());

app.use('/api', routerBack);
app.use('/', routerFront);

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
});