module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING },
      google_id: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
    },
    {
      timestamps: true,
      tableName: "users",
      // Use snake_case column names (created_at, updated_at, google_id) to match SQL DDL
      underscored: true,
    }
  );

  return User;
};
