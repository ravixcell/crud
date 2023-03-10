import { TOKEN_LIMIT } from './../../config/constant';
import { User } from './../../models/users';
import { db } from '../../config/db';
import bycrypt from 'bcryptjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
export class AuthRepository {
	async generateToken(email: any, password: any) {
		const user = await User.findOne({
			where: {
				email
			}
		});

		if (user && (await bycrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ id: user.id, email, role: user.role },
				process.env.TOKEN_KEY,
				{ expiresIn: TOKEN_LIMIT }
			);
			const users = jwt.verify(token, process.env.TOKEN_KEY);
			return {
				token,
				message: 'success',
				users
			};
		} else {
			return {
				message: 'unauthenticated'
			};
		}
	}
}
