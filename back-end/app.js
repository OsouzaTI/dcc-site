import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);
app.listen(3000);
