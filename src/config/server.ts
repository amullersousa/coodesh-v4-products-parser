export default {
  basePath: process.env.SERVER_BASE_PATH,
  baseUrl: process.env.SERVER_BASE_URL,
  allowedOrigins: process.env.SERVER_ALLOWED_ORIGINS,
  port: process.env.SERVER_PORT,
  modules: {
    admin: {
      basePath: '/admin'
    }
  }
}
