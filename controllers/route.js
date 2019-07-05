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
			let points = [];
			if (route.name.toLowerCase().includes('kukulcán')) {
				points = [{
					'lat': '20.937060',
					'long': '-89.595058'
				}, {
					'lat': '20.938004',
					'long': '-89.596017'
				}, {
					'lat': '20.955890',
					'long': '-89.602639'
				}, {
					'lat': '20.961078',
					'long': '-89.617934'
				}, {
					'lat': '20.957640',
					'long': '-89.618684'
				}, {
					'lat': '20.958627',
					'long': '-89.622100'
				}, {
					'lat': '20.962009',
					'long': '-89.621368'
				}, {
					'lat': '20.962492',
					'long': '-89.625266'
				}, {
					'lat': '20.962220',
					'long': '-89.625374'
				}, {
					'lat': '20.962311',
					'long': '-89.626354'
				}];
			} else {
				points = [{
					'lat': '21.012844',
					'long': '-89.624189'
				}, {
					'lat': '20.998457',
					'long': '-89.621751'
				}, {
					'lat': '20.996653',
					'long': '-20.996653'
				}, {
					'lat': '20.996503',
					'long': '-89.621022'
				}, {
					'lat': '20.996238',
					'long': '-89.621068'
				}, {
					'lat': '20.995887',
					'long': '-89.621375'
				}, {
					'lat': '20.995586',
					'long': '-89.623124'
				}, {
					'lat': '20.992841',
					'long': '-89.622687'
				}, {
					'lat': '20.992093',
					'long': '-89.622727'
				}, {
					'lat': '20.991273',
					'long': '-89.622243'
				}, {
					'lat': '20.989215',
					'long': ' -89.621957'
				}, {
					'lat': '20.983185',
					'long': '-89.621761'
				}, {
					'lat': '20.975600',
					'long': '-89.622886'
				}];
			}
			res.status(200).json({
				message: 'Route retrieved successfully',
				route: {
					...route.toObject(),
					busStops: busStops,
					points: points
				}
			});
		})
		.catch(error => {
			res.status(500).json({
				message: 'get route by id failed'
			});
		});
};
