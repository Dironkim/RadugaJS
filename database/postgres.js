const { Client } = require('pg')

const client = new Client({
	user: 'radugaDev',
	password: 'raduga2024',
	host: 'localhost',
	port: '8081',
	database: 'radugaDev',
})

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	})

module.exports = client