import { User } from './../../models/users';
import { Phones } from './../../models/phone';
import { HasMany, Sequelize } from 'sequelize';
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
			const { count } = await db.Phones.findAndCountAll();
			const page = req.query.page; // page number
			const pages = Math.ceil(count / limit);
			offset = limit * (page - 1);
			const usersData = await db.Phones.findAll({
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
		const user = await db.Phones.findOne({
			where: {
				id: Number(id)
			}
		});
		return user;
	}
	async getPhonesByUserId(id: string, res: any) {
		const user = await db.Phones.findAll({
			include: [
				{
					model: db.User,
					// association: new HasMany(db.Phones, db.User, {}),
					// where: { id: id },
					attributes: [
						'id',
						'firstName',
						'lastName',
						'email',
						'userName',
						'role',
						'isActive'
					],
					required: true
				}
			],
			where: {
				purchaseBy: Number(id)
			}
		});
		return user;
	}

	async createPhone(data: any) {
		const phoneData = {
			brand: data.brand,
			model: data.model,
			ram: data.ram,
			storage: data.storage,
			code: data.code,
			price: data.price || 0,
			soldPrice: data.soldPrice || 0,
			bill: data.bill || false,
			box: data.box || false,
			inWarranty: data.inWarranty || false,
			accessories: data.accessories || false,
			purchaseBy: data.purchaseBy,
			soldBy: data.soldBy,
			soldTo: data.soldTo || null,
			soldDate: data.soldDate || null,
			isSold: data.isSold || false,
			purchaseDate: data.purchaseDate || new Date().toISOString()
		};
		try {
			const phone = await db.Phones.create(phoneData);
			return phone;
		} catch (e: any) {
			return {
				code: 400,
				message: 'something went wrong',
				error: e.name
			};
		}
	}

	async updatePhone(id: string, updatedUser: any) {
		const user = await db.Phones.update(updatedUser, {
			where: { id: Number(id) }
		});
		return user;
	}

	async deletePhone(id: string) {
		const user = await db.Phones.destroy({
			where: {
				id: Number(id)
			}
		});
		return user;
	}
}
