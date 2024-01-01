const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const generateToken = require("../utils/generateToken.js");

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
      try {
            const { name, email, password } = req.body;
            if (name) {
                  if (email) {
                        if (password) {
                              const userExists = await User
                                    .findOne({
                                          email: email
                                    })
                                    .exec();
                              if (userExists) {
                                    res.status(418).send({ error: "Email Already In Use" });
                              }
                              else {
                                    const hashedPassword = await bcrypt.hash(password, 10);
                                    const user = new User({
                                          name: name,
                                          email: email,
                                          password: hashedPassword
                                    });
                                    await user.save();
                                    res.status(201).send("Registered");
                              }
                        }
                        else {
                              res.status(400).send({ error: "Password is compulsory." });
                        }
                  }
                  else {
                        res.status(400).send({ error: "Email is compulsory." });
                  }
            }
            else {
                  res.status(400).send({ error: "Name is compulsory." });
            }
      }
      catch (error) {
            res.status(500).send({ error: error });
      }
});

authRouter.post("/login", async (req, res) => {
      try {
            const { email, password } = req.body;
            if (email) {
                  if (password) {
                        const user = await User.findOne({ email: email }).exec();
                        if (user) {
                              const valid = await bcrypt.compare(password, user.password);     
                              if (valid) {
                                    const token = generateToken(user);
                                    res.status(200).json({
                                          'tokenString': token,
                                          'name': user.name,
                                          'emailId': user.email,
                                          'id': user._id,
                                          message: "Logged in successfully"
                                    })
                              }
                              else {
                                    res.status(400).send({ error: "Incorrect Password." });
                              }
                        }
                        else {
                              res.status(400).send({ error: "Invalid User Name." });
                        }
                  }
                  else {
                        res.status(400).send({ error: "Password is compulsory." });
                  }
            }
            else {
                  res.status(400).send({ error: "Username is compulsory." });
            }

      }
      catch (error) {
            res.status(500).send({ error: error });
      }
})



module.exports = authRouter;