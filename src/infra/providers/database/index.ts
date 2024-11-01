import models from './sequelize/models'
import { startHooks } from './sequelize/hooks'

export default models

export const databaseLauncher = () => {
  return startHooks()
}
