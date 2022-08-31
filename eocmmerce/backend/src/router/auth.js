const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const expressAsyncHandler = require('express-async-handler');
const authenticate = require('../middleware/authenticate');
// const toasts = require('react-toastify');
// const toast = toasts.toast;
const AuthRouter = express.Router();

AuthRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFind = await User.findOne({ email });
      if (!userFind) {
        return res.status(401).json({
          error: 'Invalid Credientials ',
          status: 401,
        });
      }
      const passwordChecker = await bcrypt.compare(password, userFind.password);
      if (!passwordChecker) {
        return res.status(401).json({
          error: 'invalid Credientials ',
          status: 401,
        });
      }
      if (passwordChecker) {
        const tokens = await userFind.generateAuthToken();

        if (!tokens) {
          return res.status(400).json({
            error: 'something went wrong Please try again ',
            status: 400,
          });
        }

        if (tokens) {
          res.cookie('woken', tokens);
          return res
            .status(200)
            .json({ message: 'User is Successfully Login', status: 200 });
        }
      }
    } catch (err) {
      console.log(err);

      res.send(err);
    }

    //res.status(401).send({ message: 'invalid Credientials' });
  })
);
AuthRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const UserFind = await User.findOne({ email: email });
      console.log(UserFind);
      if (UserFind) {
        return res.status(409).send({
          error: 'User is Already dtaken',
          status: 409,
        });
      }
      const user = new User({ name, email, password });
      const newUser = await user.save();
      if (newUser) {
        return res.status(201).json({
          message: 'User is Successfully Created',
          status: 201,
        });
      }
    } catch (error) {
      console.log(error);
    }
  })
);
AuthRouter.get(
  '/logout',
  expressAsyncHandler(async (req, res) => {
    try {
      res.clearCookie('woken');
      res.status(200).json({
        message: 'User is Successfully Logout',
        status: 200,
      });
    } catch (error) {
      console.log(error);
    }
  })
);
AuthRouter.get('/getData', authenticate, async (req, res) => {
  const data = req.rootUser;
  if (data) {
    res.status(200).json({
      message: data,
      status: 200,
    });
  }
  if (!data) {
    res.json({
      error: 'User is UnAuthorized',
      status: 401,
    });
  }
});
module.exports = AuthRouter;
