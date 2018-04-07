const api = require('express')();
const item = require('./item');
const items = require('./items');

api.get('/items/:id', item);
api.get('/items', items);
api.get('*', (req, res) => res.status(404).end());

module.exports = api;
