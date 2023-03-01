import Sequelize from 'sequelize';
import { sequelize } from '../config/db';

export const User = sequelize.define(
	'user',
	{
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		userName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				len: [6, 30]
			}
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,

		tableName: 'users'
	}
);
