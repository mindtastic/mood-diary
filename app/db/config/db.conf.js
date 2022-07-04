export default {
  host: 'postgres',
  username: 'root',
  password: 'root',
  database: 'diary',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
