import express from 'express';
const router = express.Router();
import { UserRepository } from '../../repositories/user/index';

const userRepository = new UserRepository();

router.get('/', async (req, res) => {
	const users = await userRepository.getAllUsers(req, res);
	res.json(users);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await userRepository.getUserById(id);
	res.json(user);
});

router.post('/', async (req, res) => {
	const newUser = req.body;
	const user = await userRepository.createUser(newUser);
	res.json(user);
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const updatedUser = req.body;
	const user = await userRepository.updateUser(id, updatedUser);
	res.json(user);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	await userRepository.deleteUser(id);
	res.sendStatus(204);
});
export default router;
