const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.use(express.json());

router.route('/').post(teacherController.createQuiz);
router.route('/get-all-data').get(teacherController.getQuiz);

module.exports = router;
