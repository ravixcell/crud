import { Brand } from './models/brands';
import express from 'express';
import { sequelize } from './config/db';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const app = express();
import bodyParser from 'body-parser';
import * as router from './controllers/users/index';
import * as auth from './controllers/auth/index';
import * as phone from './controllers/phone/index';
import * as brand from './controllers/brand/index';
import * as order from './controllers/orders/index';
app.use(bodyParser.json());
app.use('/api/users', router.default);
app.use('/api/auth', auth.default);
app.use('/api/phones', phone.default);
app.use('/api/brand', brand.default);
app.use('/api/order', order.default);

// Start the server
const port = process.env.PORT || 5001;

sequelize.sync();
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	// seed();
});
