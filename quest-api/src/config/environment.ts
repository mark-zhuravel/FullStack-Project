export const environment = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  frontend: {
    urls: process.env.NODE_ENV === 'production'
      ? ['https://escape-room-eight-phi.vercel.app', 'https://escape-room-eight-phi.vercel.app/api']
      : ['http://localhost:5173', 'http://localhost:3000']
  },
  database: {
    postgresql: process.env.DATABASE_URL,
    mongodb: process.env.MONGODB_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
}; 