import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './users';
import { Phones } from './phone';
import { Customer } from './customer';

export const Orders = sequelize.define(
	'orders',
	{
		deviceId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		customerId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		paymentMode: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		orderId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,
		tableName: 'orders'
	}
);
// Orders.belongsTo(User);
// Orders.hasOne(Phones);
// Orders.belongsTo(Customer);
