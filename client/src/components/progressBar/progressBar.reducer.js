import {UPDATE_PREPERING, UPDATE_BAKING, UPDATE_PACKAGING, UPDATE_DELIVERING, UPDATE_DELIVERED} from './progressBar.actions'

const initialState = {
    progress: 0
};

const updateProgressBar = (state, action) => {
    return Object.assign({}, state, {
        progress: action.progress
    });
};

const actionMap = {
    [UPDATE_PREPERING]: updateProgressBar
};

export const reducer = (state = initialState, action) => {
    const act = actionMap[action.type];
    return act ? act(state, action) : state;
}



