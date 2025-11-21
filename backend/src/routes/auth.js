const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
  body('name').isLength({ min: 2 }).withMessage('Name at least 2 chars'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password at least 6 chars'),
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
], authController.login);

module.exports = router;
