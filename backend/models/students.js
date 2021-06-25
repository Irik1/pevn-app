const {DataTypes} = require ('sequelize');

module.exports = Student = db.define('students',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name:{
        type: DataTypes.STRING(),
    }
})