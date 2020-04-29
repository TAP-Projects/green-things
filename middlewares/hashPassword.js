// Hash passwords

const bcrypt =  require ( "bcrypt" ); 
const db = require('../db');
const saltRounds =  10 ;

const hash = async (req, res, next) => {

    try {
        const hashed = await bcrypt.hash(req.body.password, saltRounds);
        req.body.hashed = hashed;
        return next();
    } catch(error) {
        next(error);
    }

}

const compare = async (req,res,next) => {

    try {
        const retrievedUser = await db.query('SELECT * FROM green_user WHERE username = $1;', [req.body.username])
        const compared = await bcrypt.compare(req.body.password, retrievedUser.passwd);
        req.compared = compared;
        //! This is probably wrong. It could be res.rows or 
        //! Actually, do I even need this? Do I pass the response on with next()?
        res.results.rows[0] = retrievedUser
        return next();
    } catch(error){
        next(error);
    }
}

module.exports = [hash, compare]