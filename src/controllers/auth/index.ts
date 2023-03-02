import { AuthRepository } from './../../repositories/auth/index';
import express from 'express';
const router = express.Router();
const AuthRepo = new AuthRepository();
router.post('/login', async (req, res) => {
	console.log('dd', req.body);

	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) {
			res.status(400).json({ message: 'All input is required' });
		}
		// Validate if user exist in our database
		const user = await AuthRepo.generateToken(email, password);
		return res.status(200).json({ user });
	} catch (err) {
		return res.status(400).json({ err });
	}
	res.json(req.body);
});

export default router;
