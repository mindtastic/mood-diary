const Sequelize = require('sequelize');
const MoodModel = require('./models/mood.js');
const UserModel = require('./models/user.js');

const connectionString = 'postgres://root:root@postgres:5432/diary';
const sequelize = new Sequelize(connectionString);

const Mood = MoodModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Mood.hasOne(User, {
  foreignKey: 'uid'
});

User.hasMany(Mood, {
  foreignKey: 'author_id'
});

module.exports = {
  sequelize,
  Sequelize,
  Mood,
  User
}