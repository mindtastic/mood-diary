export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  return User;
};
