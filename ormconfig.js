const TYPE_ORM_MODULE_OPTIONS = require("./src/config/database").TYPE_ORM_MODULE_OPTIONS

module.exports = {
  type: 'postgres',
  connectionLimit: 10000,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: ['src/db/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
  },
  ...TYPE_ORM_MODULE_OPTIONS
};
