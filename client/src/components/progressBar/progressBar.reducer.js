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
    switch (action.type){
        case UPDATE_PREPERING:
        case UPDATE_PACKAGING:
        case UPDATE_PACKAGING:
        case UPDATE_DELIVERING:
        case UPDATE_DELIVERED:
            return updateProgressBar(state, action)
            break
        default:
            return state
    }
    const act = actionMap[action.type];
    return act ? act(state, action) : state;
}



