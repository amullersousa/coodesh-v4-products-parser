// import { v4 as uuid } from 'uuid'
import runner from '../runner'

export default {
  async up(queryInterface, Sequelize) {
    await runner.run([])
  },

  async down(queryInterface, Sequelize) {
    await runner.run([])
  }
}
