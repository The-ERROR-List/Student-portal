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

    courseDescription:{
        type: DataTypes.STRING(500),
        allowNull : true,
    },
 

 })

module.exports = Course;