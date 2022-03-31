const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

// 유저 보기
router.get('/', (req, res) => {
  userModel
    .find()
    .exec()
    .then((users) => {
      console.log(users);
      const response = {
        count: users.length,
        info: users.map((user) => {
          return {
            email: user.email,
            _id: user._id,
            password: user.password,
          };
        }),
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// 회원가입
router.post('/signup', (req, res) => {
  userModel.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({
        msg: '이미 존재하는 아이디 입니다',
      });
    }

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
});

// 로그인
router.post('/login', (req, res) => {
  userModel
    .find({ email: req.body.email })
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({
          msg: '유저가 없습니다',
        });
      }
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(400).json({
            msg: '비밀번호가 일치 하지 않다',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            'secret',
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            msg: '토큰 인증 성공',
            toekn: token,
          });
        }
        res.status(401).json({
          msg: '인증 실패',
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// 회원탈퇴
router.delete('/:userId', (req, res) => {
  const id = req.params.userId;
  userModel
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: '회원탈퇴',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/users',
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
