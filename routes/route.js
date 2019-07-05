const express = require('express');
const router = express.Router();

const RoutesController = require('../controllers/route');

router.post('', RoutesController.createRoute);
router.get('', RoutesController.getRoute);
router.get('/:id', RoutesController.getRouteById);

module.exports = router;

