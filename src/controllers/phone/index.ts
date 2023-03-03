import { PhoneRepository } from './../../repositories/phone/index';
import express from 'express';
const router = express.Router();

const phoneRepository = new PhoneRepository();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const auth = require('../../middleware/auth');
router.get('/', auth, async (req, res) => {
	const users = await phoneRepository.getAllPhones(req, res);
	res.json(users);
});

router.get('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const response = await phoneRepository.getPhonesById(id, res);
	return res.status(200).send({ code: 200, response });
});
router.get('/user/:id', auth, async (req, res) => {
	const id = req.params.id;
	console.log('d', id);
	const response = await phoneRepository.getPhonesByUserId(id, res);
	return res.status(200).send({ code: 200, response, id });
});

router.post('/', auth, async (req, res) => {
	const phones = req.body;
	console.log('ddd');
	const phone = await phoneRepository.createPhone(phones);
	res.json(phone);
});

router.put('/:id', auth, async (req, res) => {
	const id = req.params.id;
	const updatePhone = req.body;
	const phone = await phoneRepository.updatePhone(id, updatePhone);
	res.json(phone);
});

router.delete('/:id', auth, async (req, res) => {
	const id = req.params.id;
	try {
		const phone = await phoneRepository.deletePhone(id);
		res.status(204).json({ status: 200, message: 'deleted' });
	} catch (e) {
		res.status(400).json({ message: 'something went wrong' });
	}
});
export default router;
