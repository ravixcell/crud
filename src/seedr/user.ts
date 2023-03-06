/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');
const bycrypt = require('bcryptjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});
const { Orders } = require('../models/order');
const { Customer } = require('../models/customer');
const { Brand } = require('../models/brands');
const { Phones } = require('../models/phone');

const { User } = require('../models/users');

export const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Phones = Phones;
db.Brand = Brand;
db.Customer = Customer;
db.Orders = Orders;
// Test the database connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Database connection has been established successfully.');
	})
	.catch((err: unknown) => {
		console.error('Unable to connect to the database:', err);
	});

// Define the models for the database
// Sync the models with the database
// sequelize.sync();

export const seed = async () => {
	await seedUsers();
	await seedBrands();
	await seedPhones();
	await seedCustomer();
	await seedOrder();
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
const seedCustomer = async () => {
	try {
		const customer = [];
		for (let i = 0; i < 20; i++) {
			const newUser = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				userName: faker.internet.userName(),
				mobile: faker.phone.phoneNumber('91########'),
				createdBy: faker.datatype.number({
					min: 2,
					max: 20
				}),
				isActive: faker.helpers.arrayElement([true, false]),
				lastPurchase: faker.date.between(
					'2021-01-01T00:00:00.000Z',
					'2023-02-01T00:00:00.000Z'
				)
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			customer.push(newUser);
		}
		await db.Customer.bulkCreate(customer);
	} catch (err) {
		console.log(err);
	}
};
const seedOrder = async () => {
	try {
		const customer = [];
		for (let i = 0; i < 20; i++) {
			const newUser = {
				deviceId: i * 2,
				customerId: faker.datatype.number({
					min: 2,
					max: 20
				}),
				userId: faker.datatype.number({
					min: 2,
					max: 20
				}),
				paymentMode: faker.helpers.arrayElement([
					'cash',
					'credit',
					'creditCard',
					'debitCard',
					'upi',
					'loan'
				]),
				price: faker.random.numeric(4),
				orderId:
					new Date().getFullYear().toString() +
					faker.random.numeric(6).toString()
			};
			// For each fake user you create, you're going to push them into the user array you declare above
			customer.push(newUser);
		}
		console.log(customer);
		await db.Orders.bulkCreate(customer);
	} catch (err) {
		console.log(err);
	}
};
seed();
