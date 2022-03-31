const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user');

// 회원가입
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      return err.res.status(500).json({
        error,
      });
    }
    const user = new userModel({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        res.status(200).json({
          msg: '회원가입 성공',
          userInfo: result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error,
        });
      });
  });
});

module.exports = router;
