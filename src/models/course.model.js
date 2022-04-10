'use strict';
 const Course =  (sequelize,DataTypes) => sequelize.define('course',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    courseName :{
        type: DataTypes.STRING,
        allowNull: false,

    },
  
    courseGrade:{
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    teacherId :{
        type: DataTypes.INTEGER,
        allowNull: false, //foreign key   
    
    },
    studentId:{
        type: DataTypes.INTEGER,
        allowNull: false, //foreign key

    },
 })
module.exports = Course;