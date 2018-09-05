import {UPDATE_USERNAME, UPDATE_PASSWORD} from './login.action-types';

export const updateUsername = (username) => {
    const action = {
        type: UPDATE_USERNAME,
        username
    };

    return action;
};


export const updatePassword = (password) => {
    const action = {
        type: UPDATE_PASSWORD,
        password
    };

    return action;
};