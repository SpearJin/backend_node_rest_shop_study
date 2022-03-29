const http = require('http');
const express = require('express');
const app = express();

const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

const PORT = 3000;

const server = http.createServer(app);
server.listen(PORT, console.log('server Connect'));
