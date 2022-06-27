'use strict';
 const Announcement =  (sequelize,DataTypes) => sequelize.define('announcement',{
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    announcementTitle :{
        type: DataTypes.STRING,

    },
    announcementBody:{
        type:DataTypes.STRING,
    },
    announcementLink:{
        type : DataTypes.STRING,        

    },
  
 })
 
module.exports = Announcement;