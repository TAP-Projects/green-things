const db = require("../db");

// 1. The login route receives the POST request for password matching
// 2. The login route calls validate and handleValidationErrors, 
// 3. The login route then calls hashPassword
//      3a. 
// 3. The login route then calls loginController
// 4. loginControlleruse the username to retrieve that user
// 3. bcrypt compare to compare the retrieved password hash with the re-hashed password from req.body.password
// 4. proceed to the next() middleware

const login = async (req, res, next) => {
	try {
        // Set session
        // Store user's profile in res.body
        res.body = result.results.rows[0];
		return next();
	} catch (error) {
		next(error);
	}
};

module.exports = login;