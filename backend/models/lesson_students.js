const {DataTypes} = require ('sequelize');

//Подключение внешних ключей
const lessons = require("./lessons");
const students = require("./students");

module.exports = Lesson_student = db.define('lesson_students',{
    lesson_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: lessons,
            key: "id"
        }
    },

    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: students,
            key: "id"
        }
    },

    visit:{
        type: DataTypes.BOOLEAN,
    },

})

Lesson_student.removeAttribute('id');
lessons.hasMany(Lesson_student, {foreignKey: 'lesson_id',sourceKey: 'id'});
Lesson_student.belongsTo(lessons, {foreignKey: 'lesson_id',sourceKey: 'id'});
students.hasMany(Lesson_student, {foreignKey: 'student_id',sourceKey: 'id'});
Lesson_student.belongsTo(students, {foreignKey: 'student_id',sourceKey: 'id'});