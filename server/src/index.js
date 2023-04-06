const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/population/:id?', (req, res) => {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 100;
    const offset = (page - 1) * size;
    if (id) {
        if (id.startsWith('country')) {
            pool.query(`
                SELECT countries.name as country_name, state.name as state_name, cities.name as city_name, SUM(cities.population) as total
                FROM cities
                JOIN state ON cities.id_state = state.id_state
                JOIN countries ON state.id_country = countries.id_country
                WHERE countries.id_country = ${id.split('_')[1]}
                GROUP BY countries.name, state.name, cities.name
                LIMIT $1 OFFSET $2`, [size, offset], (err, result) => {
                if (err) throw err;
                res.json(result.rows);
            });
        } else if (id.startsWith('state')) {
            pool.query(`
                SELECT state.name as state_name, cities.name as city_name, SUM(cities.population) as total
                FROM cities
                JOIN state ON cities.id_state = state.id_state
                WHERE state.id_state = ${id.split('_')[1]}
                GROUP BY state.name, cities.name
                LIMIT $1 OFFSET $2`, [size, offset], (err, result) => {
                if (err) throw err;
                res.json(result.rows);
            });
        } else if (id.startsWith('city')) {
            pool.query(`
                SELECT cities.name as city_name, population
                FROM cities
                WHERE id_city = ${id.split('_')[1]}
                LIMIT $1 OFFSET $2`, [size, offset], (err, result) => {
                if (err) throw err;
                res.json(result.rows);
            });
        } else {
            res.status(400).json({ message: 'Invalid parameter' });
        }
    } else {
        pool.query(`
            SELECT countries.name as country_name, state.name as state_name, cities.name as city_name, SUM(cities.population) as total
            FROM cities
            JOIN state ON cities.id_state = state.id_state
            JOIN countries ON state.id_country = countries.id_country
            GROUP BY countries.name, state.name, cities.name
            LIMIT $1 OFFSET $2`, [size, offset], (err, result) => {
            if (err) throw err;
            res.json(result.rows);
        });
    }
});

app.get('/country', (req, res) => {
    pool.query(`SELECT * FROM countries`,
    (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    })
})

app.get('/country/:id', (req, res) => {
    const {id} = req.params;
    pool.query(`
    SELECT state.name as state, cities.name as city, cities.population as population
    FROM state JOIN cities ON cities.id_state = state.id_state
    WHERE id_country = ${id}`,
    (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    })
})

app.get('/state', (req, res) => {
    pool.query(`SELECT * FROM state`,
    (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    });
});

app.get('/state/cities/:id', (req, res) => {
    const {id} = req.params;
    pool.query(`
    SELECT cities.name as name, cities.population as population 
    FROM cities
    WHERE id_state = ${id}`, 
    (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    })
})

app.get('/cities', (req, res) => {
    pool.query(`SELECT * FROM cities`,
    (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    })
})

app.listen(8080, () => {
	console.log("Servidor escuchando en el puerto 8080");
});
