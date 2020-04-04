const express = require('express');
const routes = express.Router();

const Cart = require('../app/controllers/CartController');

routes.get('/', Cart.index);
routes.post('/:id/add-one', Cart.addOne);
routes.post('/:id/remove-one', Cart.removeOne);
routes.post('/:id/delete', Cart.delete);

module.exports = routes;