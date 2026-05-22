const createTask = require('../controllers/createTask');
const loadTasks = require('../controllers/loadTasks');
const getATask = require('../controllers/getATask');
const updateTask = require('../controllers/updateTask');
const deleteTask = require('../controllers/deleteTask');

const routes = require('express').Router();


routes.post('/', createTask);
routes.get('/', loadTasks);
routes.get('/:id', getATask);
routes.put('/:id', updateTask);
routes.delete('/:id', deleteTask);

module.exports = routes;