import runner from '../runner'

export default {
  async up(queryInterface, Sequelize) {
    const createProducts = () => {
      return queryInterface.createTable('products', {
        code: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true
        },
        status: {
          type: Sequelize.ENUM('draft', 'trash', 'published'),
          allowNull: false
        },
        imported_t: {
          type: Sequelize.TIMESTAMP,
          allowNull: false
        },
        url: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        creator: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        created_t: {
          type: Sequelize.TIMESTAMP,
          allowNull: false
        },
        last_modified_t: {
          type: Sequelize.TIMESTAMP,
          allowNull: false
        },
        product_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        quantity: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        brands: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        categories: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        labels: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        cities: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        purchase_places: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        stores: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        ingredients_text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        traces: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        serving_size: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        serving_quantity: {
          type: Sequelize.NUMBER,
          allowNull: false
        },
        nutriscore_score: {
          type: Sequelize.NUMBER,
          allowNull: false
        },
        nutriscore_grade: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        main_category: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        image_url: {
          type: Sequelize.TEXT,
          allowNull: false
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
          type: Sequelize.TIMESTAMP,
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
