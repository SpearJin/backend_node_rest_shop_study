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
router.put('/:productId', (req, res) => {
  const id = req.params.productId;
  const { name, price } = req.body;

  productModel
    .updateOne(
      { _id: id },
      {
        name,
        price,
      }
    )
    .then((result) => {
      res.status(200).json({
        msg: 'Product 수정 성공',
        updateProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        erorr,
      });
    });
});

// 데이터 삭제
router.delete('/:productId', (req, res) => {
  const id = req.params.productId;

  productModel
    .remove({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: 'Prodcut 삭제 성공',
        deleteProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// 특정 상품 불러오기
router.get('/:productId', (req, res) => {
  const id = req.params.productId;

  productModel
    .findById({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: '상품 불러오기',
        getProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        erorr,
      });
    });
});

module.exports = router;
