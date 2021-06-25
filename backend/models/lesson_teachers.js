const {DataTypes} = require ('sequelize');

//Подключение внешних ключей
const lessons = require("./lessons");
const teachers = require("./teachers");

module.exports = Lesson_teacher = db.define('lesson_teachers',{
    lesson_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: lessons,
            key: "id"
        }
    },

    teacher_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: teachers,
            key: "id"
        }
    },
})

Lesson_teacher.removeAttribute('id');
lessons.hasMany(Lesson_teacher, {foreignKey: 'lesson_id',sourceKey: 'id'});
Lesson_teacher.belongsTo(lessons, {foreignKey: 'lesson_id',sourceKey: 'id'});
teachers.hasMany(Lesson_teacher, {foreignKey: 'teacher_id',sourceKey: 'id'});
Lesson_teacher.belongsTo(teachers, {foreignKey: 'teacher_id',sourceKey: 'id'});