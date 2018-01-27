import bcrypt from 'bcrypt-nodejs';

import User from '../models/User';

import * as Id from '../helpers/UserId';
import * as Token from '../helpers/Token'
import * as Mail from '../helpers/Email';
import * as Reply from '../helpers/response/User';
import * as BuildMessage from '../helpers/Message';

const profileFields = 'username firstname email created last_login';

const login = (req, res) => {
    if (!req.body.username || !req.body.password)
        return Reply.noUsernameOrPassword(res);
    return User.findOne({ username: req.body.username }, (err, user) => {
        if (!user)
            return Reply.userNotFound(res);
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                return User.findOneAndUpdate({ username: user.username }, { last_login: Date.now() })
                    .then((user) => {
                        const token = Token.sign(user);
                        const loginEmailMessage = BuildMessage.login(user);

                        Mail.send(loginEmailMessage);
                        return Reply.signInSuccess(res, token);
                    })
                    .catch(err => Reply.serverError(res, err));
            }
            else
                return Reply.invalidPassword(res);
        }
    });
}

const register = (req, res) => {
    const user = new User(req.body);

    return user.save((err, user) => {
        if (err) {
            return Reply.badRequest(res, err);
        }
        const signUpEmailMessage = BuildMessage.register(user);
        const token = Token.sign(user);
        
        Mail.send(signUpEmailMessage);
        return Reply.signUpSuccess(res, token);
    });
}

const getUserProfile = (req, res) => {
    const user_id = Id.decode(req.params.user_id);
    return User.findOne({ user_id }, profileFields, (err, user) =>  {
        if(!err) {
            return user ? 
                Reply.userProfileData(res, user) :
                    Reply.userNotFound(res, err);
        } 
        else
            return Reply.serverError(res, err);
    })
}

export {
    login,
    register,
    getUserProfile,
}