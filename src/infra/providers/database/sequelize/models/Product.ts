export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.ENUM('draft', 'trash', 'published'),
        allowNull: false,
        defaultValue: 'draft'
      },
      imported_t: {
        type: DataTypes.DATE,
        allowNull: true
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      creator: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_t: {
        type: DataTypes.DATE,
        allowNull: true
      },
      last_modified_t: {
        type: DataTypes.DATE,
        allowNull: true
      },
      product_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      quantity: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      brands: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      categories: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      labels: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cities: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      purchase_places: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      stores: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ingredients_text: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      traces: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      serving_size: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      serving_quantity: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      nutriscore_score: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      nutriscore_grade: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      main_category: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'products',
      indexes: [{ unique: true, fields: ['code'] }]
    }
  )

  Product.beforeValidate(instance => {
    for (const key in instance.dataValues) {
      if (
        typeof instance.dataValues[key] === 'string' &&
        instance.dataValues[key] === ''
      ) {
        instance.dataValues[key] = null
      }
    }
  })

  return Product
}
