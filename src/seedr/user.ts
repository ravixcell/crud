import { db } from '../config/db';
import { faker } from '@faker-js/faker';
export const seed = async () => {
	try {
		// await db.sync({ force: true });

		// Declare a variable and set it equal to an array.
		const users = [];

		// This for loop decides how many datapoints you will create.
		// If you want to change the amount, just change the number in the for loop!
		for (let i = 0; i < 100; i++) {
			const name = faker.name.firstName();
			const newUser = {
				firstName: name,
				lastName: faker.name.lastName(),
				userName: faker.internet.userName(),
				email: faker.internet.email(name).toLowerCase(),
				password: faker.internet.password()
			};

			// For each fake user you create, you're going to push them into the user array you declare above
			users.push(newUser);
		}
		// console.
		// For each user in the array, you are going to create a new user instance in the database
		users.forEach(async (user) => {
			await db.User.create(user);
		});
	} catch (err) {
		console.log(err);
	}
};
