import { Brand } from './../models/brands';
import { db } from '../config/db';
import { faker } from '@faker-js/faker';
import bycrypt from 'bcryptjs';
export const seed = async () => {
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
				password: await bycrypt.hash(faker.internet.password(), 10),
				role: faker.helpers.arrayElement(['admin', 'owner', 'sales']),
				isActive: faker.helpers.arrayElement([true, false])
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			users.push(newUser);
		}
		// console.
		// For each user in the array, you are going to create a new user instance in the database
		// users.forEach(async (user) => {});
		await db.User.bulkCreate(users);
	} catch (err) {
		console.log(err);
	}
};
const seedBrands = async () => {
	try {
		const brands = [];

		for (let i = 0; i < 10; i++) {
			const name = faker.company.name();
			const newUser = {
				name: faker.company.name(),
				count: faker.random.numeric(2),
				isActive: faker.helpers.arrayElement([true, false])
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			brands.push(newUser);
		}
		// console.
		// For each user in the array, you are going to create a new user instance in the database
		// users.forEach(async (user) => {});
		await db.Brand.bulkCreate(brands);
	} catch (err) {
		console.log(err);
	}
};
seedBrands();
