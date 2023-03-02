import express from 'express';
const router = express.Router();
import { UserRepository } from '../../repositories/user/index';

const userRepository = new UserRepository();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const auth = require('../../middleware/auth');
router.get('/', auth, async (req, res) => {
	const users = await userRepository.getAllUsers(req, res);
	res.json(users);
});

router.get('/:id', auth, async (req, res) => {
	const id = req.params.id;
	console.log('here', id);
	const response = await userRepository.getUserById(id, res);
	return res.status(200).send({ code: 200, response });
});

router.post('/', auth, async (req, res) => {
	const newUser = req.body;
	const user = await userRepository.createUser(newUser);
	res.json(user);
});

router.put('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const updatedUser = req.body;
	const user = await userRepository.updateUser(id, updatedUser);
	res.json(user);
});

router.delete('/:id', auth, async (req, res) => {
	const id = req.params.id;
	try {
		const user = await userRepository.deleteUser(id);
		res.status(204).json({ status: 200, message: 'deleted' });
	} catch (e) {
		console.log('error', e);
		res.status(400).json({ message: 'something went wrong' });
	}
});
export default router;
