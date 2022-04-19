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

    }

    

 })
 
module.exports = Class;