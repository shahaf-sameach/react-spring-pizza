export const UPDATE_PIZZA_TYPE = '[ORDER_FORM] updatePizzaType';
export const UPDATE_LOCATION = '[ORDER_FORM] updateLocation';


export const updatePizzaType = (username) => {
    const action = {
        type: UPDATE_PIZZA_TYPE,
        username
    };

    return action;
};


export const updateLocation = (location) => {
    const action = {
        type: UPDATE_LOCATION,
        location
    };

    return action;
};