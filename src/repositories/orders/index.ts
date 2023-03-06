import { Customer } from './../../models/customer';
import { Orders } from './../../models/order';
import { db } from '../../config/db';
export class OrderRepository {
	async getAllOrders(req: any, res: any) {
		const limit = Number(req.query.limit) || 20;
		let offset = 0;
		const key = req.query.search || '';
		try {
			const page = req.query.page; // page number
			offset = limit * (page - 1);
			const brandData = await db.Orders.findAndCountAll({
				offset: offset,
				limit: limit
				// include: [
				// 	{
				// 		model: db.User,
				// 		required: false
				// 	}
				// ]
			});
			const pages = Math.ceil(brandData.count / limit);
			return {
				data: { brandData, pages }
			};
		} catch (e) {
			return e;
		}
	}

	async getBrandById(id: string, res: any) {
		const user = await db.Brand.findOne({
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
			email: newUser.email
			// password: await bycrypt.hash(newUser.password, 10)
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
