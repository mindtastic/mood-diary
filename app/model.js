module.exports = (sequelize, DataTypes) => {
    const Mood = sequelize.define("Mood", {
        mood_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        mood_day: {
            type: DataTypes.DATE,
            allowNull: false
        },
        mood_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mood_descr: {
            type: DataTypes.STRING
        }
    }, {
        schema: 'dev',
        tableName: 'mood_entries',
        timestamps: false
    });

    return Mood;
}