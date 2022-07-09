export default {
  host: process.env.HOST,
  username: process.env.USER,
  password: process.PASSWORD,
  database: process.env.DBNAME,
  dialect: 'postgres',
  dialectOptions:{
    options: {
      encrypt: true,
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
