const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({ email: req.body.email, password: hash });
			user.save()
				.then((result) => {
					return res.status(200).json({
						message: 'User created',
						result: result
					});
				})
				.catch(err => {
					console.log('err: ', err);
					return res.status(500).json({
						message: 'Invalid authentication credentials!'
					});
				});
		});
};

exports.loginUser = (req, res, next) => {
	let fetchedUser;
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(401).json({
					message: 'Auth failed, user not found'
				});
			}
			fetchedUser = user;
			// checks password.
			return bcrypt.compare(req.body.password, user.password);
		})
		.then(result => {
			if (!result) {
				return res.status(401).json({
					message: 'Auth failed, password doesnt match'
				});
			}
			// create json web token:
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				process.env.JWT_KEY,
				{ expiresIn: '30d' }
			);
			res.status(200).json({
				token: token,
				expiresIn: 86400, // 30 days in seconds = 86400
				userId: fetchedUser._id
			});
		})
		.catch(err => {
			res.status(401).json({
				message: 'Auth failed, user not found or password doesnt match'
			});
		});
};
