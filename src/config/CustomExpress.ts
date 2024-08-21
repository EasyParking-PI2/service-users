import express from 'express';
import cors from 'cors';
import errorHandler from '../middleware/errorHandler';
import RethinDBConnection from "../infra/RethinkDBConnection";
import dotenv from 'dotenv';

const customExpress = () => {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  RethinDBConnection.connect();
  RethinDBConnection.createDatabaseIfNotExists();


  app.use('/', require('../routes/user.route'));

  app.use(errorHandler);



  return app;

}

export default customExpress;