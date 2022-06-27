'use strict';
 const Content =  (sequelize,DataTypes) => sequelize.define('content',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    contentTitle :{
        type: DataTypes.STRING,

    },
    contentBody:{
        type:DataTypes.STRING,
    },
    contentLink:{
        type : DataTypes.STRING,        

    },
  
 })
 
module.exports = Content;