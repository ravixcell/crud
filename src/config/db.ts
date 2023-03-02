// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
import { Orders } from './../models/order';
import { Customer } from './../models/customer';

export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'Admin@123',
	database: 'my_database'
});
console.log(sequelize, 'gggg');
import { Brand } from '../models/brands';
import { Phones } from '../models/phone';
import { User } from '../models/users';

export const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Phones = Phones;
db.Brands = Brand;
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

// Export the database connection and models
module.exports = {
	sequelize,
	User,
	db,
	Phones,
	Brand,
	Customer,
	Orders
};
