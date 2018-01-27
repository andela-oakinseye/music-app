import * as Token from '../helpers/Token';
import * as Response from '../helpers/response/User';

const AuthChecker = (req, res, next) => {
    const authToken  = req.headers.token || req.body.token || req.params.token;
    return authToken && Token.decode(authToken) ?
        next() :
            Response.invalidToken(res);
}

export default AuthChecker