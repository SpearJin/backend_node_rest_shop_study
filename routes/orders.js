const express = require('express');
const router = express.Router();

// 데이터 불러오기
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'order data 데이터 불러옴',
  });
});

// 데이터 생성
router.post('/', (req, res) => {
  res.status(200).json({
    msg: 'order data 데이터 생성',
  });
});

// 데이터 수정
router.put('/', (req, res) => {
  res.status(200).json({
    msg: 'order data 데이터 수정',
  });
});

// 데이터 삭제
router.delete('/', (req, res) => {
  res.status(200).json({
    msg: 'order data 데이터 삭제',
  });
});

module.exports = router;
