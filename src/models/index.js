'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');
// const adminModel = require('../models/adminModel');
const courseModel = require('../models/course.model');
const classModel = require('../models/class.model');

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
// let AdminModel = adminModel(sequelize, DataTypes);
let CourseModel = courseModel(sequelize, DataTypes);
let ClassModel = classModel(sequelize, DataTypes);

// relations between tables

// StudentModel.belongsToMany(CourseModel,{foreignKey:'',sourceKey:'id'});
// CourseModel.belongsToMany(StudentModel, {foreignKey:'',sourceKey:'id'});
// TeacherModel.belongsToMany(CourseModel, {foreignKey:'',sourceKey:'id'});



module.exports = {
    db: sequelize,
    studentModel: StudentModel,
    teacherModel: TeacherModel,
    // , adminModel : adminModel(sequelize, DataTypes)
    courseModel: CourseModel,
    classModel: ClassModel,
};