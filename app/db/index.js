const Sequelize = require('sequelize');
const dbConfig = require('./config/db.conf.js');

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

db.user = require('./models/user.js')(sequelize, Sequelize);
db.mood = require('./models/mood.js')(sequelize, Sequelize);


// N:1 mood entires belongsto a user
db.mood.belongsTo(db.user,{ foreignKey: 'author_id' });
// 1:N user can have multiple mood entries
db.user.hasMany(db.mood, { foreignKey: 'author_id' });

module.exports = db;





