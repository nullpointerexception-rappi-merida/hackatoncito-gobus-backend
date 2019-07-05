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

exports.getRoute = async (req, res, next) => {
	//const {id, name, origin, destination, startpoint, endpoint} = req.query;
	const routes = await Route.find({ isActive: true })
		.then(routes => {
			res.status(200).json({
				message: 'get all routes',
				routes: routes
			});

		})
		.catch(error => {
			res.status(500).json({
				message: 'get all routes failed'
			});
		});

};

exports.getRouteById = async (req, res, next) => {

	const route = await Route.findById(req.params.id)
		.then(route => {
			res.status(200).json({
				message: 'get the route',
				route: route
			});
		})
		.catch(error => {
			res.status(500).json({
				message: 'get route by id failed'
			});
		});
};
