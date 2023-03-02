import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { Orders } from './order';

export const Customer = sequelize.define(
	'customer',
	{
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		mobile: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false
		},
		userName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		isActive: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: true
		},
		lastPurchase: {
			type: Sequelize.DATE,
			allowNull: true
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,
		tableName: 'customer'
	}
);
// Customer.hasMany(Orders);
