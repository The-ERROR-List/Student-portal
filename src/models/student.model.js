//classModel
'use strict';
 const Student =  (sequelize,DataTypes) => sequelize.define('student',{
    studentName :{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,

    },
    email:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false, //foreign key 
    },
    password:{
        len: [8,16],//lllllll
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM('student'),
        
    },
    actions: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            student: ["read", "create", "update"],
          };
          return acl[this.role];
        }
    }
 })

module.exports = Student;