const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orderModel = require('../models/order');
const productModel = require('../models/product');
const checkAuth = require('../middleware/checkAuth');

// 데이터 불러오기
router.get('/', checkAuth, (req, res) => {
  orderModel
    .find()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        order: docs.map((doc) => {
          return {
            _id: doc._id,
            productId: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/orders/' + doc._id,
            },
          };
        }),
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        erorr,
      });
    });
});

// 데이터 생성
router.post('/', checkAuth, (req, res) => {
  productModel
    .findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          msg: 'Product not found',
        });
      }
      const order = new orderModel({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      res.status(200).json({
        msg: 'Order stored',
        createOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + result._id,
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

// 데이터 수정
router.put('/:orderId', checkAuth, (req, res) => {
  const id = req.params.orderId;
  const { quantity } = req.body.quantity;
  orderModel
    .updateOne({ _id: id }, { quantity })
    .then((result) => {
      res.status(200).json({
        msg: 'Order 수정 성공',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + result._id,
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

// 데이터 삭제
router.delete('/:orderId', checkAuth, (req, res) => {
  const id = req.params.orderId;
  orderModel
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: 'Order 삭제 성공',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/',
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

// 데이터 검색
router.get('/:orderId', checkAuth, (req, res) => {
  const id = req.params.orderId;

  orderModel
    .findOne({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: '상품 불러오기',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders',
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
