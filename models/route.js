const mongoose = require('mongoose');


const routeSchema = mongoose.Schema({
	name: { type: String, required: true },
	origin: { type: String, required: true },
	destination: { type: String, required: true }
});

module.exports = mongoose.model('Route', routeSchema);
