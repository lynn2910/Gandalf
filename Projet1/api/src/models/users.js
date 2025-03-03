const {DataTypes} = require("sequelize");
module.exports = function (sequelize) {
    return sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {isEmail: true}
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'users'
        }
    );
};