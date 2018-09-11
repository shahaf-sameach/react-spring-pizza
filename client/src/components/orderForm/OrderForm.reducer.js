import {UPDATE_PIZZA_TYPE, UPDATE_LOCATION, UPDATE_BUTTON_LABEL, UPDATE_BUTTON_DISABLE, UPDATE_FORM_DISABLED} from './OrderForm.actions'

const initialState = {
    pizzaType: 0,
    location: 0,
    buttonLabel: 'Place Order',
    buttonDisable: false
};

const updatePizzaType = (state, action) => {
    return Object.assign({}, state, {
        pizzaType: action.payload.pizzaType
    });
};

const updateLocation = (state, action) => {
    return Object.assign({}, state, {
        location: action.payload.location
    });
};

const updateButtonLable = (state, action) => {
    return Object.assign({}, state, {
        buttonLabel: action.payload.buttonLabel
    });
};

const updateButtonDisable = (state, action) => {
    return Object.assign({}, state, {
        buttonDisable: action.payload.buttonDisable
    });
};

const updateFormDisabled = (state, action) => {
    return Object.assign({}, state, {
        formDisabled: action.payload.formDisabled
    });
};


export const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_PIZZA_TYPE:
            return updatePizzaType(state, action)
            break
        case UPDATE_LOCATION:
            return updateLocation(state, action)
            break
        case UPDATE_BUTTON_LABEL:
            return updateButtonLable(state, action)
            break
        case UPDATE_BUTTON_DISABLE:
            return updateButtonDisable(state, action)
            break
        case UPDATE_FORM_DISABLED:
            return updateFormDisabled(state, action)
            break
        default:
            return state
    }
}



