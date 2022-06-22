'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const studentModel = require('./student.model');
const teacherModel = require('./teacher.model');
const courseModel = require('./course.model');
const classModel = require('./class.model');
const userModel = require('./user.model');
const contentModel = require('./content.model');
const student_classModel=require('./student_class.model')


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

let UserModel = userModel(sequelize, DataTypes);
let StudentModel = studentModel(sequelize, DataTypes);
let TeacherModel = teacherModel(sequelize, DataTypes);
let CourseModel = courseModel(sequelize, DataTypes);
let ClassModel = classModel(sequelize, DataTypes);
let ContentModel = contentModel(sequelize, DataTypes);
let Student_classModel =student_classModel(sequelize,DataTypes)

// relations between tables

UserModel.hasOne(StudentModel);
StudentModel.belongsTo(UserModel);

UserModel.hasOne(TeacherModel);
TeacherModel.belongsTo(UserModel);

TeacherModel.belongsToMany(CourseModel, { through: 'teacher_course' })
CourseModel.belongsToMany(TeacherModel, { through: 'teacher_course' })

CourseModel.hasMany(ClassModel);
ClassModel.belongsTo(CourseModel); // course can exist without class but class can't exist without course, therfore i will have the courseId as a FK in the class

//teacher can exist without class 
TeacherModel.hasMany(ClassModel);
ClassModel.belongsTo(TeacherModel);

StudentModel.belongsToMany(ClassModel, { through: 'student_class' })
ClassModel.belongsToMany(StudentModel, { through: 'student_class' })

ClassModel.hasMany(ContentModel);
ContentModel.belongsTo(ClassModel); // class can exist without content but content can't exist without class, therefore content table will have classID as FK




module.exports = {
    db: sequelize,
    studentModel: StudentModel,
    teacherModel: TeacherModel,
    courseModel: CourseModel,
    classModel: ClassModel,
    userModel: UserModel,
    contentModel: ContentModel,
    student_classModel : Student_classModel,

};