import { Op } from 'sequelize';

export const searchQuery = (searchKey: any, cols: any = []) => {
	if (searchKey && cols.length) {
		const object: any = {};
		cols.map((name: any) => {
			object[name] = {
				[Op.like]: `%${searchKey}%`
			};
		});
		// console.log(object);
		return {
			[Op.or]: object
		};
	} else {
		return {};
	}
	// return searchKey
	// 	? {
	// 			model: {
	// 				[Op.like]: `%${searchKey}%`
	// 			}
	// 	  }
	// 	: {};
};
