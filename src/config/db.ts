// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});
import { Orders } from '../models/order';
import { Customer } from '../models/customer';
import { Brand } from '../models/brands';
import { Phones } from '../models/phone';

import { User } from '../models/users';

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
sequelize.sync();

// Export the database connection and models
module.exports = {
	sequelize,
	User,
	Phones,
	Brand,
	Customer,
	Orders,
	db
};
