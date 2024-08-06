import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import RethinDBConnection from "./infra/RethinkDBConnection";
import dotenv from 'dotenv';
import rethinkdb from 'rethinkdb';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

RethinDBConnection.createDatabaseIfNotExists();


app.use('/', require('./routes/user.route'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
