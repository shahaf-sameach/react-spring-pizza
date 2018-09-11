export const UPDATE_INIT = '[PROGRESS_BAR] initProgressBar'
export const UPDATE_PROCESSING = '[PROGRESS_BAR] updateProcessing'
export const UPDATE_PREPARING = '[PROGRESS_BAR] updatePreparing'
export const UPDATE_BAKING = '[PROGRESS_BAR] updateBaking'
export const UPDATE_PACKAGING = '[PROGRESS_BAR] updatePackaging'
export const UPDATE_DELIVERING = '[PROGRESS_BAR] updateDelivering'
export const UPDATE_DELIVERED = '[PROGRESS_BAR] updateDelivered'

export const updateProgressBar = (type) => ({
    type
})
