const config = require('dotenv').config();
const express = require('express');
const Pool = require('pg').Pool;
const pool = new Pool();

async function testConnection() {
    try {
        await pool.connect();
        await pool.end();
    } catch (err) {
        next(err);
    }
}

testConnection();

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
