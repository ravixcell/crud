import { db } from '../../config/db';
export class PhoneRepository {
	constructor() {
		// Initialize your database connection here
		// For this example, we'll use a simple array to store user data
	}

	async getAllPhones(req: any, res: any) {
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

	async getPhonesById(id: string, res: any) {
		const user = await db.User.findOne({
			where: {
				id: Number(id)
			}
		});
		return user;
	}

	async createPhone(newUser: any) {
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

	async updatePhone(id: string, updatedUser: any) {
		const user = await db.User.update(updatedUser, {
			where: { id: Number(id) }
		});
		return user;
	}

	async deletePhone(id: string) {
		const user = await db.User.destroy({
			where: {
				id: Number(id)
			}
		});
		return user;
	}
}
