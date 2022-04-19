'use strict';
const User = (sequelize, DataTypes) => sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        len: [8, 16],
        allowNull: false,

    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'),
        allowNull: false,
        defaultValue: 'student',

    },
    token: {
        type: DataTypes.VIRTUAL
    },
    actions: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                student: ["read", "create"],
                teacher: ["read", "create", "update"],
                admin: ["read", "create", "update", "delete"]
            };
            return acl[this.role];
        }
    }

});
module.exports = User;