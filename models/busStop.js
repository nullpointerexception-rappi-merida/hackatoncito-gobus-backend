const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busStopSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	lat: { type: String, required: true },
	long: { type: String, required: true },
	route: { type: Schema.Types.ObjectId, ref: 'Route' }
});

module.exports = mongoose.model('BusStop', busStopSchema);
