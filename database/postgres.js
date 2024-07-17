const {Sequelize} = require('sequelize')
const {dbUsername, dbPassword} = require('../static/credentials')
// подключение к бд
const db = new Sequelize('radugaDev',dbUsername,dbPassword,{
		host: 'localhost',
		dialect:'postgres',
		port: '8081',
		logging: false
	})
db.authenticate()
	.then(()=>{console.log('DB connected')})
	.catch(err=>{console.error('DB connection error: ', err)})
module.exports = db
