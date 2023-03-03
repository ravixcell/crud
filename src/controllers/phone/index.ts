import express from 'express';
import { PhoneRepository } from '../../repositories/phone';
const router = express.Router();

const userRepository = new PhoneRepository();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const auth = require('../../middleware/auth');
router.get('/', auth, async (req, res) => {
	const users = await userRepository.getAllPhones(req, res);
	res.json(users);
});

router.get('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const response = await userRepository.getPhonesById(id, res);
	return res.status(200).send({ code: 200, response });
});

router.post('/', auth, async (req, res) => {
	const phones = req.body;
	const phone = await userRepository.createPhone(phones);
	res.json(phone);
});

router.put('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const updatePhone = req.body;
	const phone = await userRepository.updatePhone(id, updatePhone);
	res.json(phone);
});

router.delete('/:id', auth, async (req, res) => {
	const id = req.params.id;
	try {
		const phone = await userRepository.deletePhone(id);
		res.status(204).json({ status: 200, message: 'deleted' });
	} catch (e) {
		res.status(400).json({ message: 'something went wrong' });
	}
});
export default router;
