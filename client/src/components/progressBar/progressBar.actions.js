export const UPDATE_PROCESSING = '[PROGRESS_BAR] updatePrepering'
export const UPDATE_PREPERING = '[PROGRESS_BAR] updatePrepering'
export const UPDATE_BAKING = '[PROGRESS_BAR] updateBaking'
export const UPDATE_PACKAGING = '[PROGRESS_BAR] updatePackaging'
export const UPDATE_DELIVERING = '[PROGRESS_BAR] updateDelivering'
export const UPDATE_DELIVERED = '[PROGRESS_BAR] updateDeliverd'


export const updateProgresBar = (stage) => {
    const action = {
        type: stage
    };

    return action;
};
