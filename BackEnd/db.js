import pg from 'pg'
import env from "dotenv"

const { Pool } = pg

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});

module.exports = pool;
