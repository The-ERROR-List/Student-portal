'use strict';
 const Class =  (sequelize,DataTypes) => sequelize.define('class',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    className :{
        type: DataTypes.STRING,
        allowNull: false,

    },
    
    courseId :{
        type: DataTypes.INTEGER,
        allowNull: false, //foreign key
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
module.exports = Class;