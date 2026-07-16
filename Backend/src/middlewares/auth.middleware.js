const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "please Login fist"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({
                message: "Unauthorise User"
            })
        }

        req.id = verifyToken.id;

        next()

    } catch (err) {
          res.status(500).json({
            message:`Invalid User ${err}`
          })
    }

}


module.exports = authMiddleware