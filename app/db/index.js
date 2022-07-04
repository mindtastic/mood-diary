import Sequelize from 'sequelize';
import dbConfig from './config/db.conf';
import createUserModel from './models/user';
import createMoodModel from './models/mood';

// Create database
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = createUserModel(sequelize, Sequelize);
db.mood = createMoodModel(sequelize, Sequelize);

// N:1 mood entires belongsto a user
db.mood.belongsTo(db.user, { foreignKey: 'author_id' });
// 1:N user can have multiple mood entries
db.user.hasMany(db.mood, { foreignKey: 'author_id' });

export default db;
