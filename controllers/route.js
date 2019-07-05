const Route = require('../models/route');
const BusStop = require('../models/busStop');

exports.createRoute = (req, res, next) => {
	const route = new Route({
		name: req.body.name,
		origin: req.body.origin,
		destination: req.body.destination
	});
	route.save()
		.then((createdRoute) => {
			for (const busStop of req.body.busStops) {
				busStop.route = createdRoute;
			}
			BusStop.insertMany(req.body.busStops)
				.then((busStopsCreated) => {
					Route.findOneAndUpdate({ _id: createdRoute._id }, { $set: { busStops: busStopsCreated } })
						.then((result) => {
							res.status(200).json({
								message: 'Route added successfully',
								route: {
									...result.toObject(),
									busStops: busStopsCreated,
									id: result._id
								}
							});
						})
						.catch(() => {
							throw new Error('error occurred while updating author');
						});
				});
		})
		.catch(error => {
			res.status(500).json({
				message: 'Creating a route failed'
			});
		});
};
