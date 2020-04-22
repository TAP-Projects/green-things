/** @format */

// Validate and sanitize user data on account creation or update

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

const checks = [
    // first name
    check("first_name")
        .optional()
        .trim()
        .isLength({ min:1, max:255 }),
    // last name
    check("last_name")
        .optional()
        .trim()
        .isLength({ min:1, max:255 }),
	// email must be an email
    check("email", "Invalid email.")
        .exists(checkFalsy: true, checkNull: true)
        .isEmail()
        .normalizeEmail()
        // Make sure it isn't already in use
        .custom(value => {
            // Find the username in the db, and if found return error
            return green_user.findUserByEmail(value)
                .then(user => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                });
        }),
    // username
    check("username", "Invalid username.")
        .exists(checkFalsy: true, checkNull: true)
        .isLength({ min:4, max:16 })
        .withMessage('Username must be between 4 and 16 characters in length.')
        // Allow only printable ASCII characters
        .matches(/^[ -~]+$/)
        .withMessage('Username must contain only printable ASCII characters.')
        // Make sure it isn't already in use
        .custom(value => {
            // Find the username in the db, and if found return error
            return green_user.findUserByUsername(value)
                .then(user => {
                    if (user) {
                        return Promise.reject('Username already in use');
                    }
                });
        }),
	// password must be at least 8 chars long, but no longer than 16
    check("password", 'Invalid password.')
        .exists(checkFalsy: true, checkNull: true)
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 and 16 characters in length.')
        .matches(/^[ -~]+$/)
        .withMessage('Password must contain only printable ASCII characters.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter.'),
    check("passwordConfirmation", "Passwords do not match.")
        // Make sure password confirmation matches password
        .custom((value, {req}) => (value === req.body.password))
];

const handleValidationErrors = (req, res, next) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// There are errors. Render form again with sanitized values/errors messages.
		// Error messages can be returned in an array using `errors.array()`.
		return res.status(422).json({ errors: errors.array() });
	} else {
        // Data from form is valid, continue
        next();
    }
}

//Sample error object
const errorExample = {
	errors: [
		{
			location: "body",
			msg: "Invalid value",
			param: "username",
		},
	],
};

module.exports = {  checks, handleValidationErrors }