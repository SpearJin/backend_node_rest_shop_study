const http = require('http');
const express = require('express');
const morgan = require('morgan');
const app = express();

const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use(morgan('short'));
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
    },
  });
});

const PORT = 3000;

const server = http.createServer(app);
server.listen(PORT, console.log('server Connect'));
