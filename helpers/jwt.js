const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const api = process.env.API_URL;
  const secret = process.env.secret;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    /**
     * * allowing user to login in order to access token
     * * otherwise user would have no authorization at all to access token
     */
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}
async function isRevoked(req, token) {
  // token now contains payload data

  if (!token.payload.isAdmin) {
    return true; // if the isAdmin flag in payload is false, then we reject the token
  }

  return false;
}

module.exports = authJwt;
