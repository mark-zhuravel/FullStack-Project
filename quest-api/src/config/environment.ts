export const environment = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  frontend: {
    url: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : 'http://localhost:5173'
  },
  database: {
    postgresql: process.env.DATABASE_URL,
    mongodb: process.env.MONGODB_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
}; 