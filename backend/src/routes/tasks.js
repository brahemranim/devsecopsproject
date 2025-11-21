const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

router.use(auth);

router.get('/', taskController.getTasks);

router.post('/', [
  body('title').isLength({ min: 1 }).withMessage('Title is required'),
], taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
