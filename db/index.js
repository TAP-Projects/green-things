const config = require('dotenv').config();
const express = require('express');
const Pool = require('pg').Pool;
const pool = new Pool();

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    testConnection: async () => {
        try {
            const connected = await pool.connect();
            console.log("Connected to ", connected.database);
            await pool.end();
        } catch (err) {
            console.error(err);
        }
    }
};
