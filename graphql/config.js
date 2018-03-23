module.exports = {
  GRAPHQL_PORT: process.env.GRAPHQL_PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
    process.env.DATABASE_URL || 'mongodb://brentguistwite:Asjkhadfg1@ds119489.mlab.com:19489/btb-graphql',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/thinkful-backend-test',
  JWT_SECRET: 'Ilovelamp',
  JWT_EXPIRY: '1d',
};
