import runner from '../runner'

export default {
  async up(queryInterface, Sequelize) {
    const createProducts = () => {
      return queryInterface.createTable('products', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true
        },
        code: {
          type: Sequelize.BIGINT,
          allowNull: false,
          unique: true
        },
        status: {
          type: Sequelize.ENUM('draft', 'trash', 'published'),
          allowNull: false,
          defaultValue: 'draft'
        },
        imported_t: {
          type: Sequelize.DATE,
          allowNull: true
        },
        url: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        creator: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        created_t: {
          type: Sequelize.DATE,
          allowNull: true
        },
        last_modified_t: {
          type: Sequelize.DATE,
          allowNull: true
        },
        product_name: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        quantity: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        brands: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        categories: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        labels: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        cities: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        purchase_places: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        stores: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        ingredients_text: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        traces: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        serving_size: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        serving_quantity: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
        nutriscore_score: {
          type: Sequelize.BIGINT,
          allowNull: true
        },
        nutriscore_grade: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        main_category: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        image_url: {
          type: Sequelize.TEXT,
          allowNull: true
        }
      })
    }

    const createImportHistory = () => {
      return queryInterface.createTable('import_history', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        filename: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        total_imported: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        imported_t: {
          type: Sequelize.DATE,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('success', 'failure', 'pending'),
          allowNull: false,
          defaultValue: 'pending'
        }
      })
    }

    await runner.run([createProducts, createImportHistory])
  },

  async down(queryInterface, Sequelize) {
    const deleteProducts = () => queryInterface.dropTable('products')
    const deleteImportHistory = () => queryInterface.dropTable('import_histories')

    await runner.run([deleteProducts, deleteImportHistory])
  }
}
