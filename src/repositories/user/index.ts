import { Phones } from './../../models/phone';
import { Op } from 'sequelize';
import { db } from '../../config/db';
import bycrypt from 'bcryptjs';
import { searchQuery } from '../../Services/common';
export class UserRepository {
	constructor() {
		// Initialize your database connection here
		// For this example, we'll use a simple array to store user data
	}

	async getAllUsers(req: any, res: any) {
		const limit = Number(req.query.limit) || 20;
		let offset = 0;
		const key = req.query.search || '';
		console.log(key, 'search');
		try {
			const page = req.query.page; // page number
			offset = limit * (page - 1);
			const user = await db.User.findAndCountAll({
				where: {
					role: {
						[Op.not]: 'god'
					},
					include: [
						{
							model: Phones
						}
					],
					...searchQuery(key, [
						'firstName',
						'lastName',
						'email',
						'userName',
						'role'
					])
				},
				offset: offset,
				limit: limit,
				attributes: [
					'id',
					'firstName',
					'lastName',
					'email',
					'userName',
					'role',
					'isActive'
				]
			});
			const pages = Math.ceil(user.count / limit);
			console.log(user);
			return {
				data: { user, pages }
			};
		} catch (e) {
			return e;
		}
	}

	async getUserById(id: string, res: any) {
		const user = await db.User.findOne({
			where: {
				id: Number(id)
			}
		});
		return user;
	}

	async createUser(newUser: any) {
		const userData = {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			userName: newUser.userName,
			email: newUser.email,
			password: await bycrypt.hash(newUser.password, 10)
		};
		try {
			const user = await db.User.create(userData);
			return user;
		} catch (e) {
			return e;
		}
	}

	async updateUser(id: string, updatedUser: any) {
		const user = await db.User.update(updatedUser, {
			where: { id: Number(id) }
		});
		return user;
	}

	async deleteUser(id: string) {
		const user = await db.User.destroy({
			where: {
				id: Number(id)
			}
		});
		return user;
	}
}
