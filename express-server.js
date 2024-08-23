import express from 'express';
const server = express();
import teachersRouter from './routes/teacher.js';
import studentRouter from './routes/student.js';
import MongooseconnectDB from './db.utils/Mongoose.js';
import connectDB from './db.utils/Mongo.js';
import cors from 'cors';
import registerRouter from './routes/auth/register.js';
import loginRouter from './routes/auth/login.js';
// import jwt from "jsonwebtoken";
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

const authApi = (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const data = jwt.verify(token, process.env.JWT_SECRET);
  
      if (data.role === "Teacher") {
        next();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err.message);
      // err
      res.status(403).send({ msg: "Unauthorized" });
    }
  };
//Endpoint Routes
server.use('/students',studentRouter);
server.use('/teachers',authApi,teachersRouter);
server.use('/register',registerRouter);
server.use('/login',loginRouter);


const port = 8000;
server.listen(port, ()=>{
    console.log(Date().toString(),`Server is running on port ${port}`);
});