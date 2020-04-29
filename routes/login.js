var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('log-in', { title: 'Green Things' });
});

router.post('/', login);

module.exports = router;