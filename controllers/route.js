const Route = require('../models/route');

exports.createRoute = (req, res, next) => {
	const route = new Route({
		name: req.body.name,
		origin: req.body.origin,
		destination: req.body.destination
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
