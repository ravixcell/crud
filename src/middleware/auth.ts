/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken');

const verifyToken = (req: any, res: any, next: any) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res
			.status(403)
			.send({ message: 'A token is required for authentication' });
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send({ message: 'invalid token', err });
	}
	next();
};

module.exports = verifyToken;
