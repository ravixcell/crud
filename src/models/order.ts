import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './users';
import { Phones } from './phone';
import { Customer } from './customer';

export const Orders = sequelize?.define(
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
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		orderId: {
			type: Sequelize.STRING,
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
Orders.associate = function () {
	Orders.hasOne(User, { foreignKey: 'userId' });
	Orders.hasOne(Phones, { foreignKey: 'deviceId' });
	Orders.hasOne(Customer, { foreignKey: 'customerId' });
};
