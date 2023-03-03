import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { Brand } from './brands';
import { Orders } from './order';
import { User } from './users';

export const Phones = sequelize?.define(
	'phones',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		brand: {
			type: Sequelize.STRING,
			allowNull: false
		},
		model: {
			type: Sequelize.STRING,
			allowNull: false
		},
		ram: {
			type: Sequelize.STRING,
			allowNull: false
		},
		storage: {
			type: Sequelize.STRING,
			allowNull: false
		},
		code: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		purchaseDate: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			defaultValue: Sequelize.NOW
		},
		bill: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		box: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		inWarranty: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		accessories: {
			type: Sequelize.JSON,
			allowNull: true,
			defaultValue: false
		},
		purchaseBy: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		isSold: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		soldBy: { type: Sequelize.INTEGER, allowNull: false },
		soldPrice: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		soldTo: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		soldDate: {
			type: Sequelize.DATEONLY,
			allowNull: true
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,
		tableName: 'phones'
	}
);
// Phones.belongsTo(Brand);
// Phones.belongsTo(Orders);
// Phones.belongsTo(User);
