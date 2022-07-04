export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    schema: 'dev',
    tableName: 'users',
    timestamps: false,
  });

  return User;
};
