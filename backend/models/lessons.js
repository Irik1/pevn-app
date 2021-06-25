const {DataTypes} = require ('sequelize');

module.exports = Lesson = db.define('lessons',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    date:{
        type: DataTypes.DATE,
    },

    title:{
        type: DataTypes.STRING(),
    },

    status: {
        type: DataTypes.INTEGER,
    }
})