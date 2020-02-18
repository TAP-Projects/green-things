var express = require('express');
var router = express.Router();
const pool = require('../queries.js');

/* GET users listing. */
//!NOTE: Not sure about the parameter here :id
router.get('/:id', getUserById);

function getUserById(req, res, next) {
    const id = parseInt(req.params.id);
    
    //! NOTE: You can do this with async/await rather than a callback
    //! NOTE: You can also use a config object in pool.query() rather than passing in the query, any parameters, and the callback. The parameters array is omitted here, because there aren't any.

    // $1 represents the id we supply in the 2nd parameter
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        console.log("We got this far anyway.")
        if (error) { return next(error) }
        res.status(200).json(results.rows);
    });
};

module.exports = router;
