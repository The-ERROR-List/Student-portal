'use strict';
const Course = (sequelize, DataTypes) => sequelize.define('course', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    courseGrade: {
        type: DataTypes.STRING,
    },
    courseDescription:{
        type: DataTypes.STRING,
        allowNull : true,
    },
    courseImg:{
        type:DataTypes.STRING,
    }

 })

module.exports = Course;