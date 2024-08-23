import express from 'express';
const server = express();
import teachersRouter from './routes/teacher.js';
import studentRouter from './routes/student.js';
import MongooseconnectDB from './db.utils/Mongoose.js';
import connectDB from './db.utils/Mongo.js';
import cors from 'cors';
import registerRouter from './routes/auth/register.js';
import loginRouter from './routes/auth/login.js';

server.use(express.json());
server.use(cors());
await connectDB();
await MongooseconnectDB();

const customMiddleware = (req, res, next) => {
    console.log(
      new Date().toString(),
      "Handling request for",
      req.method,
      req.originalUrl
    );
  
    next();
  };
  
server.use(customMiddleware);


//Endpoint Routes
server.use('/students',studentRouter);
server.use('/teachers',teachersRouter);
server.use('/register',registerRouter);
server.use('/login',loginRouter);


const port = 8000;
server.listen(port, ()=>{
    console.log(Date().toString(),`Server is running on port ${port}`);
});