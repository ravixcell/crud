import { User } from './../../models/users';
import { db } from '../../config/db';
export class UserRepository {
	users: any[];
	constructor() {
		// Initialize your database connection here
		// For this example, we'll use a simple array to store user data
		this.users = [];
	}

	async getAllUsers(req: any, res: any) {
		const limit = Number(req.query.limit) || 20;
		let offset = 0;
		try {
			const { count } = await db.User.findAndCountAll();
			const page = req.query.page; // page number
			const pages = Math.ceil(count / limit);
			offset = limit * (page - 1);
			const usersData = await db.User.findAll({
				offset: offset,
				limit: limit
			});
			// console.log(usersData);
			return {
				total: count,
				pages: pages,
				data: usersData
			};
		} catch (e) {
			return e;
		}
	}

	async getUserById(id: string) {
		const user = await db.User.findOne({
			where: {
				id: Number(id)
			}
		});
		return user || null;
	}

	async createUser(newUser: any) {
		const userData = {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			userName: newUser.userName,
			email: newUser.email,
			password: newUser.password
		};
		try {
			const user = await db.User.create(userData);
			return user;
		} catch (e) {
			return e;
		}
	}

	async updateUser(id: string, updatedUser: any) {
		console.log(updatedUser);
		const user = await db.User.update(updatedUser, {
			where: { id: Number(id) }
		});
		console.log('user', user);
		return user;
	}

	async deleteUser(id: string) {
		console.log(id);
		const user = await db.User.destroy({
			where: {
				id: Number(id)
			}
		});
		return user;
	}
}
