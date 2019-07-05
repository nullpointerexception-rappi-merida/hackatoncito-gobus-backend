const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = mongoose.Schema({
	name: { type: String, required: true },
	origin: { type: String, required: true },
	destination: { type: String, required: true },
	busStops: { type: [Schema.Types.ObjectId], ref: 'BusStop' }
});

module.exports = mongoose.model('Route', routeSchema);
