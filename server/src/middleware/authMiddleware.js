const statusCode = require('../data/statusCode');
const tokenService = require('../services/token-service');
const userService = require('../services/user-service');

exports.isLoggedin = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new Error();
        }

        const userid = await tokenService.verifyAccessToken(accessToken);

        const userData = await userService.findUser({ _id: userid.id });
        if (userData) {
            req.user = userData;
            // console.log(res.user)
        }
        next();
    } catch (error) {
        return res.status(statusCode.UNAUTHORIZED.code).json({ message: statusCode.UNAUTHORIZED.message })
    }
};


exports.requiredRole = (requiredRole) => {
    return async (req, res, next) => {
        const { accessToken } = req.cookies;
        // console.log(req.cookies)
        try {
            if (!accessToken) {
                throw new Error();
            }

            const userid = await tokenService.verifyAccessToken(accessToken);
            console.log(userid)
            const userData = await userService.findUser({ _id: userid.id });
            // console.log(userData)
            if (userData.role === requiredRole) {
                req.user = userData; // Attach user data to the request object
                next(); // User has the required role, proceed to the next middleware/route handler
            } else {
                res.status(statusCode.FORBIDDEN.code).json({ error: statusCode.FORBIDDEN.message });
            }
        } catch (error) {
            // console.log(error)
            res.status(statusCode.UNAUTHORIZED.code).json({ message: statusCode.UNAUTHORIZED.message });
        }
    };
};

