const mongoose = require('mongoose');
const productModel = require('../models/product');

// 데이터 불러오기
exports.products_get_all = (req, res) => {
  productModel
    .find()
    .exec()
    .then((product) => {
      const response = {
        count: product.length,
        datas: product.map((item) => {
          return {
            name: item.name,
            price: item.price,
            _id: item._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products' + item._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

// 데이터 생성
exports.products_create_product = (req, res) => {
  const { name, price } = req.body;
  productModel
    .create({
      _id: new mongoose.Types.ObjectId(),
      name,
      price,
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: 'Product 생성 성공',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id,
          },
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
exports.products_update = (req, res) => {
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
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        erorr,
      });
    });
};

// 데이터 삭제
exports.produts_delete = (req, res) => {
  const id = req.params.productId;

  productModel
    .remove({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: 'Prodcut 삭제 성공',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products',
          body: { name: 'String', price: 'String' },
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

// 특정 상품 불러오기
exports.products_get_serach = (req, res) => {
  const id = req.params.productId;

  productModel
    .findById({ _id: id })
    .then((result) => {
      res.status(200).json({
        msg: '상품 불러오기',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products',
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        erorr,
      });
    });
};
