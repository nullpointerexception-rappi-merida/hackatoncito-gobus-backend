const express = require('express');
const router = express.Router();

const RoutesController = require('../controllers/route');

router.post('', RoutesController.createRoute);

module.exports = router;

