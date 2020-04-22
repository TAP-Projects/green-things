var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
//!NOTE: Not sure about the parameter here :id
router.get('/:username', getUserByUsername);

function getUserByUsername(req, res, next) {
    const username = req.params.username;
    
    //! NOTE: You can do this with async/await rather than a callback
    //! NOTE: You can also use a config object in pool.query() rather than passing in the query, any parameters, and the callback. The parameters array is omitted here, because there aren't any.

    // $1 represents the id we supply in the 2nd parameter
    db.query('SELECT * FROM green_user WHERE username = $1', [username], (error, results) => {
        if (error) { return next(error) }
        console.log(results.rows[0]);
        res.status(200).render('profile-page', results.rows[0]);
    });
};

module.exports = router;
