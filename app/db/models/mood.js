export default (sequelize, DataTypes) => {
  const Mood = sequelize.define('Mood', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    mood_day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    mood_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validateType(type){
          if(!(type === 'positive' || type === 'negative' || type === 'neutral')){
            throw new Error("Mood type must be of type 'positive', 'negative' or 'neutral'.");
          }
        }
      }
    },
    mood_descr: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,     // only allow alphanumeric characters
      }
    }
  }, {
    schema: 'dev',
    tableName: 'mood_entries',
    timestamps: false
  });

  return Mood;
};
