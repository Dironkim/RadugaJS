const {Sequelize} = require('sequelize')
const db = new Sequelize('radugaDev','radugaDev','raduga2024',{
		host: 'localhost',
		dialect:'postgres',
		port: '8081'
	})
db.authenticate()
	.then(()=>{console.log('DB connected')})
	.catch(err=>{console.error('DB connection error: ', err)})
module.exports = db
// const { Client } = require('pg')

// const client = new Client({
// 	user: 'radugaDev',
// 	password: 'raduga2024',
// 	host: 'localhost',
// 	port: '8081',
// 	database: 'radugaDev',
// })

// client
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to PostgreSQL database');
// 	})
// 	.catch((err) => {
// 		console.error('Error connecting to PostgreSQL database', err);
// 	})

// module.exports = client