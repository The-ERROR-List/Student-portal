'use strict';
 const Content =  (sequelize,DataTypes) => sequelize.define('content',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content :{
        type: DataTypes.STRING,
        allowNull: false,

    }

    

 })
 
module.exports = Content;