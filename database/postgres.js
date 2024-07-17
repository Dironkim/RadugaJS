const {Sequelize} = require('sequelize')
const db = new Sequelize('radugaDev','radugaDev','raduga2024',{
		host: 'localhost',
		dialect:'postgres',
		port: '8081',
		logging: false
	})
db.authenticate()
	.then(()=>{console.log('DB connected')})
	.catch(err=>{console.error('DB connection error: ', err)})
module.exports = db
