'use strict';
const Teacher = (sequelize, DataTypes) => sequelize.define('teacher', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
     courseId: {
        type: DataTypes.UUID,
        allowNull: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    gender: {
        type: DataTypes.ENUM(['female', 'male']),
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

module.exports = Teacher;