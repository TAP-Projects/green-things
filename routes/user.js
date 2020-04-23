/** @format */

var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET sign up form */
router.get("/", (req, res, next) => {
	res.render("sign-up");
});

/* GET user profile. */
router.get("/:username", getUserByUsername);

function getUserByUsername(req, res, next) {
	const username = req.params.username;

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

/* POST sign up form */
router.post("/", (req, res, next) => {
	try {
		const { firstName, lastName, email, username, password } = req.body;

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
});

module.exports = router;
