const jwt = require('jsonwebtoken');
const accessTokenSecret = "thisisaccesstokensecret";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: "1h",
        });
        return accessToken;

    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

}

module.exports = new TokenService();
