'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const studentModel = require('./student.model');
const teacherModel = require('./teacher.model');
const courseModel = require('./course.model');
const classModel = require('./class.model');
const userModel = require('./user.model');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; // npm i sqlite3

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

let StudentModel = studentModel(sequelize, DataTypes);
let TeacherModel = teacherModel(sequelize, DataTypes);
let CourseModel = courseModel(sequelize, DataTypes);
let ClassModel = classModel(sequelize, DataTypes);
let UserModel = userModel(sequelize, DataTypes);
// relations between tables

UserModel.hasOne(StudentModel, { foreignKey: 'userId' });
StudentModel.belongsTo(UserModel, { foreignKey: 'userId' });

UserModel.hasOne(TeacherModel, { foreignKey: 'userId' });
TeacherModel.belongsTo(UserModel, { foreignKey: 'userId' });

TeacherModel.hasMany(ClassModel,{ foreignKey:'teacherId', sourceKey : 'id' })
ClassModel.belongsTo(TeacherModel ,{foreignKey:'teacherId',targetKey:'id' })

StudentModel.belongsToMany(ClassModel,{ through : 'student_class'})
ClassModel.belongsToMany(StudentModel,{ through : 'student_class'})

CourseModel.hasMany(ClassModel,{ foreignKey:'courseId', sourceKey : 'id' })
ClassModel.belongsTo(CourseModel ,{foreignKey:'courseId',targetKey:'id' })

StudentModel.belongsToMany(CourseModel,{ through : 'student_course'})
CourseModel.belongsToMany(StudentModel,{ through : 'student_course'})

TeacherModel.belongsToMany(CourseModel,{ through : 'teacher_course'})
CourseModel.belongsToMany(TeacherModel,{ through : 'teacher_course'})



module.exports = {
    db: sequelize,
    studentModel: StudentModel,
    teacherModel: TeacherModel,
    courseModel: CourseModel,
    classModel: ClassModel,
    userModel: UserModel
};