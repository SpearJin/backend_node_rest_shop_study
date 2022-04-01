const mongoose = require('mongoose');
const orderModel = require('../models/order');
const productModel = require('../models/product');

// 데이터 불러오기
exports.orders_get_all = (req, res) => {
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
};

// 데이터 생성
exports.orders_create_order = (req, res) => {
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
};

// 데이터 수정
exports.orders_update = (req, res) => {
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
};

// 데이터 삭제
exports.orders_delete = (req, res) => {
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
};

// 데이터 검색
exports.orders_get_serach = (req, res) => {
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
};
