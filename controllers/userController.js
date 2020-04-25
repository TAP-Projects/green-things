/** @format */

//? Do we need public.green_user or just green_user? 
//! NO. At least in getUserProfile, it works either way.
//? When you add the SQL query, does it have to end in a semicolon? 
//! NO. It works either way.
//? In db.query can you deconstruct ...req.body rather than listing all of the form fields?
//! ???
//? Is it only a SELECT query that produces a results object with rows?
//! ???

const db = require("../db");

// Retrieve the sign up form page
const getSignUp = async (req, res, next) => {
	// Show the sign up form
	res.render("sign-up", { title: "Green Things" });
};

// Retrieve the user profile page
const getUserProfile = async (req, res, next) => {
	try {
		const { username } = req.params;
		const { rows } = await db.query(
			"SELECT * FROM green_user WHERE username = $1;", 
			[username]
		);
		console.log(rows);
		if(rows.length > 0){
			res.status(200).render("profile-page", rows[0]);
		// If there are no public profiles, then only an admin will ever see this, but still.
		} else {
			const error = new Error("User Not Found");
			error.status = 404;
			next(error);
		}
	} catch (err) {
		console.error(err);
	}
};

// Create a user after submitting the sign up form page
const addUser = async (req, res, next) => {
	console.log(req);
	try {
		const {first_name, last_name, email, username, password} = req.body;
		const result = await db.query(
			"INSERT INTO public.green_user(first_name, last_name, email, username, passwd) VALUES($1,$2,$3,$4,$5);",
			[first_name, last_name, email, username, password]
		);
		res.redirect(`/`);
	} catch (err) {
		console.error(err);
	}
};

// Update user using the same 'sign up' form page
const editUser = async (req, res, next) => {
	res.render("sign-up", { title: "Green Things" });
};

// Delete a user from the user-profile page, and redirect to a confirmation page.
const deleteUser = (req, res, next) => {
	res.redirect("/");
};

const findUsername = async (username) => {
	try {
		// $1 represents the url parameter we supply in the 2nd parameter
		const userExists = await db.query(
			`SELECT * FROM public.green_user WHERE username = $1;`,
			[username]
		);
		console.log(userExists);
		return userExists;
	} catch (error) {
		console.error(error);
	}
};

const findEmail = async (email) => {
	try {
		// $1 represents the url parameter we supply in the 2nd parameter
		const userExists = await db.query(
			`SELECT * FROM public.green_user WHERE email = $1;`,
			[email]
		);
		console.log(userExists);
		return userExists;
	} catch (error) {
		console.error(error);
	}
};

const userControllers = {
	getSignUp,
	getUserProfile,
	addUser,
	editUser,
	deleteUser,
	findUsername,
	findEmail,
};

module.exports = userControllers;
