var express = require('express');
var router = express.Router();
const pool = require('../queries.js');

/* GET users listing. */
router.get('/', getUsers);

function getUsers(req, res, next) {

  //! NOTE: You can do this with async/await rather than a callback
  //! NOTE: You can also use a config object in pool.query() rather than passing in the query, any parameters, and the callback. The parameters array is omitted here, because there aren't any.

  pool.query('SELECT * FROM g_user ORDER BY u_id ASC', (error, results) => {
    if (error) { return next(error) }
    res.status(200).render('users', {title: 'Green Things', pageTitle: 'Users', results: results.rows});
  });
}

module.exports = router;
