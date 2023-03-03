import { db } from '../../config/db';
export class BrandRepository {
	async getAllbrands(req: any, res: any) {
		const limit = Number(req.query.limit) || 20;
		let offset = 0;
		const key = req.query.search || '';
		try {
			const page = req.query.page; // page number
			offset = limit * (page - 1);
			const brandData = await db.Brand.findAndCountAll({
				where: {
					isActive: 1
				},
				offset: offset,
				limit: limit,
				attributes: ['id', 'name', 'count', 'isActive']
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
