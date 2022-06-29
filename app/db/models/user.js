module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'uid'
        }
    }, {
        schema: 'dev',
        tableName: 'users',
        timestamps: false
    });

    return User;
};