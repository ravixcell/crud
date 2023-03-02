import Sequelize from 'sequelize';
import { sequelize } from '../config/db';

export const Brand = sequelize.define(
	'brand',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		count: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		isActive: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,
		tableName: 'brand'
	}
);