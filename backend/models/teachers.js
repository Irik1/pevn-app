const {DataTypes} = require ('sequelize');

module.exports = Teacher = db.define('teachers',{
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