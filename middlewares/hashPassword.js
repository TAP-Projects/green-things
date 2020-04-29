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
        const hash = await db.query('SELECT passwd FROM green_user WHERE username = $1;', [req.body.username])
        const compared = await bcrypt.compare(req.body.password, hash);
        req.compared = compared;
        return next();
    } catch(error){
        next(error);
    }
}

module.exports = [hash, compare]