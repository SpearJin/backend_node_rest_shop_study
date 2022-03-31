const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db =
  'mongodb+srv://spearjin:0511@cluster0.zuka7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: false })
  .then(() => console.log('MongoDB Connected....'))
  .catch((error) => console.log(error));

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      msg: error.message,
    },
  });
});

const PORT = 3000;

const server = http.createServer(app);
server.listen(PORT, console.log('server Connect'));
