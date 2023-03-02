import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// Create a new Express application
const app = express();
import bodyParser from 'body-parser';
import * as router from './controllers/users/index';
import * as auth from './controllers/auth/index';
app.use(bodyParser.json());
import { sequelize } from './config/db';
import { seed } from './seedr/user';
// Start the server
const port = process.env.PORT;

sequelize.sync();
app.use('/api/users', router.default);
app.use('/api/auth', auth.default);
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	// seed();
});
