import * as DateTime from '../DateTime';

const badRequest = (res, err) => {
    return res.status(400).json({
        success: false,
        message: err.message,
    });
}
const invalidPassword = (res, err) => {
    return res.status(401).json({
        success: false,
        message: 'Password is incorrect -_-'
    });
}

const invalidToken = (res, err) => {
    return res.status(401).json({
        success: false,
        message: 'Invalid Authentication Token',
    });
}

const noUsernameOrPassword = (res, err) => {
    return res.status(400).json({
        success: false,
        message: "username or password not provided"
    });
}

const serverError = (res, err) => {
    return res.status(500).json({
        success: false,
        message: err.message
    });
}

const signInSuccess = (res, token) => {
    return res.status(200).json({
        success: true,
        token,
    });
}

const signUpSuccess = (res, token) => {
    return res.status(201).json({
        success: true,
        token,
    })
}

const userNotFound = (res, err) => {
    return res.status(404).json({
        success: false,
        message: "No such user :("
    });
}

const userProfileData = (res, user) => {
    return res.status(200).json({
        success: true,
        data: {
            username: user.username,
            firstname: user.firstname,
            email: user.email,
            joined: DateTime.format(user.created),
            last_login: DateTime.format(user.last_login),
        }
    })
}



export {
    badRequest,
    invalidPassword,
    invalidToken,
    noUsernameOrPassword,
    serverError,
    signInSuccess,
    signUpSuccess,
    userNotFound,
    userProfileData
}