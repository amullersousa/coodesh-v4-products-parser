import path from 'path'

export default {
  basePath: process.env.IMPORT_BASE_PATH,
  outputPath: path.resolve(__dirname, '..', 'temp')
}
