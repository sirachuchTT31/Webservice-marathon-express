const jwt = require('jsonwebtoken')

exports.auth_mdw = async (req, res, next) => {
    try {
        console.log('test mdw request')
        const Authorization = req.headers["authorization"]
        console.log("Authorization",Authorization)
        if (!Authorization ) {
            return res.json({
                status: false,
                status_code: 401,
                message: "401 dont have token !"
            })
        }
        else {
            console.log('decode Authorization')
            const decoded = jwt.verify(Authorization, 'jwtsecret')
            user_name= decoded.username
            console.log("req.user", user_name)
            next()
        }
       
    }
    catch (e) {
        res.status(500)
    }
}