export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      code: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM('draft', 'trash', 'published'),
        allowNull: false
      },
      imported_t: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      creator: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      created_t: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
      },
      last_modified_t: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
      },
      product_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      quantity: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      brands: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      categories: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      labels: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cities: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      purchase_places: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      stores: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ingredients_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      traces: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      serving_size: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      serving_quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      nutriscore_score: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      nutriscore_grade: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      main_category: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'products'
    }
  )

  return Product
}
