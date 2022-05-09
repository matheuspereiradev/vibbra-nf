module.exports = {
    "name": "default",
    "type": "mysql",
    "logging": false,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "migrations": [process.env.MIGRATION_DIR],
    "entities": [
        process.env.MIGRATION_ENTITIES_DIR,
        __dirname + process.env.MIGRATION_ENTITIES_DIR
    ],
    "cli": {
        "migrationsDir": process.env.MIGRATION_CLI_DIR
    }
}