import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { userModel } from '../../db.utils/models.js';
import { db } from '../../db.utils/Mongo.js';
const loginRouter= express.Router();

loginRouter.post('/', async(req, res) => {
const userData=req.body;
    const userObj= await userModel.findOne({email: userData.email});
    if (userObj) {
        bcrypt.compare(
            userData.password,
            userObj.password,
            async function (err, result) {
              // result == true
              if (err) {
                res.status(500).send({ msg: "Something went wrong" });
              } else {
                if (result) {
                  const collection = db.collection("users");
                  const user = await collection.findOne(
                    { email: userData.email },
                    {
                      projection: { password: 0, __v: 0, _id: 0 },
                    }
                  );
      
                  console.log(typeof user);
      
                  var token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: "1day",
                  });
      
                  console.log(token);
      
                  res.status(200).send({
                    msg: "User Successfully Logged in",
                    code: 1,
                    token,
                  });
                } else {
                  res.status(400).send({ msg: "User Credentials Failed", code: 0 });
                }
              }
            }
          );
        } else {
          res.status(404).send({ msg: "User not found" });
        }
      });
export default loginRouter;