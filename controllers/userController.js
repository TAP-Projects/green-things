/** @format */

const db = require("../db")

// Retrieve the sign up form page
const getSignUp = (req, res, next) => {
        // Show the sign up form
        res.render("sign-up", { title: "Green Things" });
};

// Retrieve the user profile page
function getUserProfile(req, res, next) {
	const username = req.params.username;

	// Using callbacks - bad!
	// $1 represents the id we supply in the 2nd parameter
	db.query(
		"SELECT * FROM green_user WHERE username = $1;",
		[username],
		(error, results) => {
			if (error) {
				return next(error);
			}
			console.log(results.rows[0]);
			res.status(200).render("profile-page", results.rows[0]);
		}
	);
}

// Create a user after submitting the sign up form page
const addUser = (req, res, next) => {
    try {
		const { firstName, lastName, email, username, password } = req.body;

		// Using callbacks - bad!
		db.query(
			"INSERT INTO public.green_user(first_name,last_name,email,username,passwd) VALUES($1,$2,$3,$4,$5);",
			[firstName, lastName, email, username, password],
			(error, results) => {
				if (error) {
					return next(error);
				}
				res.redirect(`/user/:${username}`);
			}
		);
	} catch (err) {
		console.error(err);
	}
};

// Update user using the same 'sign up' form page
const editUser = (req, res, next) => {
	res.render("sign-up", { title: "Green Things" });
};

// Delete a user from the user-profile page, and redirect to a confirmation page.
const deleteUser = (req, res, next) => {
	res.redirect("/");
};

const findUsername = (username) => {
	// Using callbacks - bad!
	// $1 represents the url parameter we supply in the 2nd parameter
	db.query(
		`SELECT * FROM green_user WHERE username = ${username};`,
		null,
		(error, results) => {
			if (error) {
				console.error(error);
				return false;
			}
			console.log(results.rows[0]);
			results.rows[0];
		}
	);
};

const findEmail = (email) => {
	// Using callbacks - bad!
	// $1 represents the url parameter we supply in the 2nd parameter
	db.query(
		`SELECT * FROM green_user WHERE email = ${email};`,
		null,
		(error, results) => {
			if (error) {
				console.error(error);
				return false;
			}
			console.log(results.rows[0]);
			results.rows[0];
		}
	);
}

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
