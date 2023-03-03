import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { Orders } from './order';
import { Phones } from './phone';
import { ROLES } from '../config/constant';

export const User = sequelize?.define(
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
				len: [6, 256]
			}
		},
		role: {
			type: Sequelize.ENUM(...ROLES),
			defaultValue: 'sales',
			allowNull: false
		},
		isActive: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: true
		}
	},
	{
		paranoid: true,
		deletedAt: 'deletedAt',
		timestamps: true,
		tableName: 'users',
		scopes: {
			admin: {
				attributes: {
					exclude: ['password']
				}
			} // No special options for admin scope. No exclusion.
		}
	}
);
// User.hasMany(Orders);
// User.hasMany(Phones);

User.associate = function () {
	User.hasMany(Phones, { as: 'phones', foreignKey: 'purchaseBy' });
};
