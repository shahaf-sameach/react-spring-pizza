export const UPDATE_PIZZA_TYPE = '[ORDER_FORM] updatePizzaType';
export const UPDATE_LOCATION = '[ORDER_FORM] updateLocation';
export const UPDATE_BUTTON_LABEL = '[ORDER_FORM] updateButtonLabel';
export const UPDATE_BUTTON_DISABLE = '[ORDER_FORM] updateButtonDisable';
export const UPDATE_FORM_DISABLED = '[ORDER_FORM] updateFormDisabled';




export const updatePizzaType = (pizzaType) => {
    const action = {
        type: UPDATE_PIZZA_TYPE,
        payload: {pizzaType}
    };

    return action;
};


export const updateLocation = (location) => {
    const action = {
        type: UPDATE_LOCATION,
        payload: {location}
    };

    return action;
};


export const updateButtonLabel = (buttonLabel) => {
    const action = {
        type: UPDATE_BUTTON_LABEL,
        payload: {buttonLabel}
    };

    return action;
};

export const updateButtonDisable = (buttonDisable) => {
    const action = {
        type: UPDATE_BUTTON_DISABLE,
        payload: {buttonDisable}
    };

    return action;
};

export const updateFormDisabled = (formDisabled) => {
    const action = {
        type: UPDATE_FORM_DISABLED,
        payload: {formDisabled}
    };

    return action;
};