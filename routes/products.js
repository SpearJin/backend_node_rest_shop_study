const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const productModel = require('../models/product');

// 데이터 불러오기
router.get('/', (req, res) => {
  productModel
    .find()
    .exec()
    .then((product) => {
      console.log(product);
      res.status(200).json(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// 데이터 생성
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const product = new productModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: 'Product 생성 성공',
        createdProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// 데이터 수정
router.put('/', (req, res) => {
  res.status(200).json({
    msg: 'product data 데이터 수정',
  });
});

// 데이터 삭제
router.delete('/', (req, res) => {
  res.status(200).json({
    msg: 'product data 데이터 삭제',
  });
});

module.exports = router;
