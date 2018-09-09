import {UPDATE_USERNAME, UPDATE_PASSWORD} from './login.action-types';

const initialState = {
    username: 'user',
    password: '1234'
};

const updateUsername = (state, action) => {
    return Object.assign({}, state, {
        username: action.username
    });
};

const updatePassword = (state, action) => {
    return Object.assign({}, state, {
        password: action.password
    });
};

const actionMap = {
    [UPDATE_USERNAME]: updateUsername,
    [UPDATE_PASSWORD]: updatePassword
};

export const reducer = (state = initialState, action) => {
    const act = actionMap[action.type];

    return act ? act(state, action) : state;
}



