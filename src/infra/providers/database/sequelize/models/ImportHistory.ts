export default (sequelize, DataTypes) => {
  const ImportHistory = sequelize.define(
    'ImportHistory',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      filename: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      total_imported: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imported_t: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('success', 'failure', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'products'
    }
  )

  return ImportHistory
}
