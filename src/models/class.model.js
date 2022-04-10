'use strict';
 const Class =  (sequelize,DataTypes) => sequelize.define('class',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    className :{
        type: DataTypes.STRING,
        allowNull: false,

    },
    
    courseId :{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //foreign key
    },
    teacherId :{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

        allowNull: false, //foreign key   
    
    },
    studentId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

        allowNull: false, //foreign key

    },

 })
module.exports = Class;