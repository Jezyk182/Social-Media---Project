import pg from 'pg'
import env from "dotenv"

const { Pool } = pg
env.config();

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

pool.on('connect', () => {
    console.log('Database connected successfully.');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


module.exports = pool;
