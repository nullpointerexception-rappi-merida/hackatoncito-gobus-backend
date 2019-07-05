const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY); // the same string as in login endpoint
		req.userData = { email: decodedToken.email, userId: decodedToken.userId };
		next();
	} catch (e) {
		return res.status(401).json({
			message: 'You are not authenticated'
		});
	}
};
