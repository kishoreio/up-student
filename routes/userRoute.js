const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.use(express.json());

router.route('/').post(userController.getUser);

module.exports = router;
