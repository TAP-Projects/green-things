var express = require('express');
var router = express.Router();

/* GET create account page. */
router.get('/', function(req, res, next) {
    res.render('add-user', { title: 'Green Things' });
});

/* POST new account */
router.post('/', function(req, res, next) {
    // do a bunch of stuff
    return
});

module.exports = router;