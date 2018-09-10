import { UPDATE_PIZZA_TYPE, UPDATE_LOCATION } from './OrderForm.actions'

const initialState = {
    username: 'Margarita',
    location: 'Nordau'
};

const updatePizzaType = (state, action) => {
    return Object.assign({}, state, {
        username: action.username
    });
};

const updateLocation = (state, action) => {
    return Object.assign({}, state, {
        location: action.location
    });
};


export const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_PIZZA_TYPE:
            return updatePizzaType(state, action)
        case UPDATE_LOCATION:
            return updateLocation(state, action)
            break
        default:
            return state
    }
}



