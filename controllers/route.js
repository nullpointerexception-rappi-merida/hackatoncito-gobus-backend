const Route = require('../models/route');

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
			res.status(200).json({
				message: 'Route added successfully',
				route: {
					...createdRoute.toObject(),
					id: createdRoute._id
				}
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
