'use strict';
 const Student =  (sequelize,DataTypes) => sequelize.define('student',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName :{
        type: DataTypes.STRING,
        allowNull: false,

    },
    
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    gender : {
        type : DataTypes.ENUM(['female','male']),
        allowNull : false,
    },
    nationality : {
        type : DataTypes.STRING
    },
    major : {
        type : DataTypes.STRING,
        allowNull : false,
    }
  
 })

module.exports = Student;