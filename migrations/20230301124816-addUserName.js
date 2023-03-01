'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn('users', 'userName', Sequelize.STRING);
	},

	async down(queryInterface, Sequelize) {
		return Promise.all([queryInterface.removeColumn('users', 'userName')]);
	}
};
