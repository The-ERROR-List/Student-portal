'use strict';
 const Class =  (sequelize,DataTypes) => sequelize.define('class',{
    className :{
        type: DataTypes.STRING,
        allowNull: false,

    },

    courseId :{
        type: DataTypes.INTEGER,
        allowNull: false, //foreign key
    }

 })
module.exports = Class;