import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../../db.utils/models.js';
import { mailOptions, transporter } from './mail-utils.js';
const registerRouter= express.Router();

registerRouter.post('/', async(req, res) => {
const userData=req.body;
// console.log(userData);
    const userObj= await userModel.findOne({email: userData.email});
    if (userObj) {
        res.status(400).send({ msg: "User already exists" });
      } else {
        const id = Date.now().toString();
        bcrypt.hash(userData.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).send({ msg: "Please enter a proper password" });
              } else {
            const newUser = await new userModel({
            ...userData,
            password: hash,
            id, });

            await newUser.save();
            await transporter.sendMail({
              ...mailOptions,
              to: userData.email,                         
            });
            res.send({ msg: "User saved successfully" });}
        });
    } 
});
export default registerRouter;