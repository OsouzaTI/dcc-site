import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routes/routes';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);
app.listen(4000);
