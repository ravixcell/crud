import { db } from '../config/db';
import { faker } from '@faker-js/faker';
import bycrypt from 'bcryptjs';
export const seed = async () => {
	await seedUsers();
	await seedBrands();
	await seedPhones();
};
const seedBrands = async () => {
	try {
		const brands = [];
		for (let i = 0; i < 10; i++) {
			const newUser = {
				name: faker.company.name(),
				count: faker.random.numeric(2),
				isActive: faker.helpers.arrayElement([true, false])
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			brands.push(newUser);
		}
		await db.Brand.bulkCreate(brands);
	} catch (err) {
		console.log(err);
	}
};

const seedPhones = async () => {
	try {
		const brands = [];
		for (let i = 0; i < 50; i++) {
			const newUser = {
				brand: faker.random.numeric(),
				model: faker.random.word(),
				ram: faker.helpers.arrayElement([2, 4, 8, 12, 16]),
				storage: faker.helpers.arrayElement([16, 32, 64, 128, 256]),
				code: faker.random.alpha({
					count: 5,
					casing: 'upper'
				}),
				price: faker.random.numeric(4),
				soldPrice: faker.random.numeric(4),
				bill: faker.helpers.arrayElement([true, false]),
				box: faker.helpers.arrayElement([true, false]),
				inWarranty: faker.helpers.arrayElement([true, false]),
				accessories: faker.helpers.arrayElement([true, false]),
				purchaseBy: faker.datatype.number({
					min: 2,
					max: 20
				}),
				soldBy: null,
				soldTo: null,
				soldDate: null,
				isSold: false,
				purchaseDate: new Date().toISOString()
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			brands.push(newUser);
		}
		await db.Phones.bulkCreate(brands);
	} catch (err) {
		console.log(err);
	}
};

const seedUsers = async () => {
	try {
		const users = [];
		const superAdmin = {
			firstName: 'Ravi',
			lastName: 'Gupta',
			userName: 'ravi',
			email: 'ravi@ravi.com',
			password: await bycrypt.hash('admin@123', 10),
			role: 'god',
			isActive: true
		};
		users.push(superAdmin);
		for (let i = 0; i < 20; i++) {
			const name = faker.name.firstName();
			const newUser = {
				firstName: name,
				lastName: faker.name.lastName(),
				userName: faker.internet.userName(),
				email: faker.internet.email(name).toLowerCase(),
				password: await bycrypt.hash('123456', 10),
				role: faker.helpers.arrayElement(['admin', 'owner', 'sales']),
				isActive: faker.helpers.arrayElement([true, false])
			};
			users.push(newUser);
		}
		await db.User.bulkCreate(users);
	} catch (err) {
		console.log(err);
	}
};
