/** @format */

const config = require("dotenv").config();
const express = require("express");
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
	connectionString: isProduction
		? process.env.DATABASE_URL
		: connectionString,
	ssl: isProduction,
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	testConnection: async () => {
		try {
			const connected = await pool.connect();
			console.log("Connected to ", connected.database);
			//await pool.end();
		} catch (err) {
			console.error(err);
		}
	},
};
