module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    "Follower",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      follower_id: {
        // references users.id (integer PK)
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      following_id: {
        // references users.id (integer PK)
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "followers",
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["follower_id", "following_id"],
        },
      ],
    }
  );

  return Follower;
};
