export default {
  secret: process.env.APP_SECRET || 'auth-key-secret',
  tokenExpiryTime: '1d', // '15m',
  refresTokenExpiryTime: '1d'
}
