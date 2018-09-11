import {
    UPDATE_PREPARING,
    UPDATE_BAKING,
    UPDATE_PACKAGING,
    UPDATE_DELIVERING,
    UPDATE_DELIVERED,
    UPDATE_PROCESSING,
    UPDATE_INIT
} from './progressBar.actions'


const preProcessing = {complete: 0, active: true, striped: "stripped", style: "warning", srOnly: true}
const processing = {complete: 20, active: true, striped: "stripped", style: "warning", srOnly: false}
const postProcessing = {complete: 20, active: false, striped: "stripped", style: "success", srOnly: false}

const initialState = {
    bars: [preProcessing, preProcessing, preProcessing, preProcessing, preProcessing]
}

const updateProcessing = (state) => {
    return Object.assign({}, state, {
        bars: [processing, preProcessing, preProcessing, preProcessing, preProcessing]
    });
};

const updatePreparing = (state) => {
    return Object.assign({}, state, {
        bars: [postProcessing, processing, preProcessing, preProcessing, preProcessing]
    });
};

const updateBaking = (state) => {
    return Object.assign({}, state, {
        bars: [postProcessing, postProcessing, processing, preProcessing, preProcessing]
    });
};

const updatePackaging = (state) => {
    return Object.assign({}, state, {
        bars: [postProcessing, postProcessing, postProcessing, processing, preProcessing]
    });
};

const updateDelivering = (state) => {
    return Object.assign({}, state, {
        bars: [postProcessing, postProcessing, postProcessing, postProcessing, processing]
    });
};

const updateDelivered = (state) => {
    return Object.assign({}, state, {
        bars: [postProcessing, postProcessing, postProcessing, postProcessing, postProcessing]
    });
};

export const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_INIT:
            return initialState
        case UPDATE_PROCESSING:
            return updateProcessing(state)
        case UPDATE_PREPARING:
            return updatePreparing(state)
        case UPDATE_BAKING:
            return updateBaking(state)
        case UPDATE_PACKAGING:
            return updatePackaging(state)
        case UPDATE_DELIVERING:
            return updateDelivering(state)
        case UPDATE_DELIVERED:
            return updateDelivered(state)
        default:
            return state
    }
}



