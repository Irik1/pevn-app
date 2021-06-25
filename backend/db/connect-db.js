const Sequelize = require('sequelize');
const options={
    host: 'localhost',
    password: "12345",
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      useUTC: true
    },
    define:{
        freezeTableName: true,
        timestamps: false
    }
}
global.db = new Sequelize("job", "postgres", "12345", options);

module.exports = async function() {

    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}