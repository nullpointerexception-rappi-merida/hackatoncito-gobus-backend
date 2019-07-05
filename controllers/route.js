const Route = require('../models/route');
const BusStop = require('../models/busStop');

exports.createRoute = (req, res, next) => {
	const route = new Route({
		name: req.body.name,
		origin: req.body.origin,
		destination: req.body.destination,
		startpoint: req.body.startpoint,
		endpoint: req.body.endpoint
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

exports.getRoutes = async (req, res, next) => {
	const routes = await Route.find({ isActive: true })
		.populate('BusStop');
	res.status(200).json({
		message: 'Routes retrieved successfully',
		routes: routes
	});

};

exports.getRouteById = (req, res, next) => {

	Route.findById(req.params.id)
		// .populate('BusStop')
		.then(async route => {
			const busStops = await BusStop.find({ route: req.params.id });
			res.status(200).json({
				message: 'Route retrieved successfully',
				route: {
					...route.toObject(),
					busStops: busStops
				}
			});
		})
		.catch(error => {
			res.status(500).json({
				message: 'get route by id failed'
			});
		});
};
