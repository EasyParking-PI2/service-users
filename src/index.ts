import express, { Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import RethinDBConnection from "./infra/RethinkDBConnection";
import dotenv from 'dotenv';
import protect from './middleware/authMiddleware';
import CustomRequest from './types/CustomRequest.type';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//test connection with rethinkdb
RethinDBConnection.connect();

app.use('/', require('./routes/user.route'));

app.use('/protected', protect, async(req: Request, res:Response) =>{
  const cReq = req as CustomRequest;
  console.log(cReq.user);
  
  res.send('Protected route');
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
