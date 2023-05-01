import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { ROLES } from '../config/constant';
import { Phones } from './phone';

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
			}
		}
	}
);

User.associate = () => {
	User.hasMany(Phones, { foreignKey: 'purchaseBy' });
};
