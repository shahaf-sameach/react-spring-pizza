import {UPDATE_PROGRESS_BAR_VISIBILITY} from './order.actions'

const initialState = {
    progressVisible: false,
};

const updateProgresVisible = (state, action) => {
    return Object.assign({}, state, {
        progressVisible: action.payload.progressVisible
    });
};


export const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_PROGRESS_BAR_VISIBILITY:
            return updateProgresVisible(state, action)
            break
        default:
            return state
    }
}



