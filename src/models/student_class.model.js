'use strict';
const student_class = (sequelize, DataTypes) => sequelize.define('student_class', {
    studentGrade: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    }
 })

module.exports = student_class;