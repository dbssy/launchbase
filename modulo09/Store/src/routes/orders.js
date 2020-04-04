const express = require('express');
const routes = express.Router();

const Order = require('../app/controllers/OrderController');

const { onlyUsers } = require('../app/middlewares/session');

routes.get('/', onlyUsers, Order.index);
routes.get('/sales', onlyUsers, Order.sales);
routes.get('/:id', onlyUsers, Order.show);
routes.post('/', onlyUsers, Order.post);
routes.post('/:id/:action', onlyUsers, Order.update);

module.exports = routes;