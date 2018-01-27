import * as User from '../controllers/User';

const login = User.login;
const register = User.register;
const getUserProfile = User.getUserProfile;

export {
    login,
    register,
    getUserProfile,
}