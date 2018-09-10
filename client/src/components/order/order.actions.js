export const UPDATE_PROGRESS_BAR_VISIBILITY = '[ORDER] updateProgressBarVisible';


export const updateProgressVisibility = (progressVisible) => {
    const action = {
        type: UPDATE_PROGRESS_BAR_VISIBILITY,
        payload: {progressVisible}
    };
    return action;
};

