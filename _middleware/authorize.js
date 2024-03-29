const jwt = require('express-jwt');
const { secret } = require('../config');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        

        jwt.expressjwt({ secret: secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            try {
                const user = await db.User.findByPk(req.auth.sub);

                // check user still exists
                if (!user)
                    return res.status(401).json({ message: 'Unauthorized' });

                // authorization successful
                req.user = user.get();

                next();
            } catch (error) {
                console.log(error)
            }
        }
    ];
}