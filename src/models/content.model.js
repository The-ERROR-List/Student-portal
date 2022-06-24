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
    contentCategory:{
        type:DataTypes.ENUM('announcement','content'),
        defaultValue: 'content',
    }
 })
 
module.exports = Content;