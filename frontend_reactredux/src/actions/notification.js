const notificationSuccess = (payload) => ({
    type: 'NOTIFICATION_SUCCESS',
    payload
})

const notificationFailure = () => ({
    type: 'NOTIFICATION_FAILURE'
})

export const notification = (payload) => {
    return async (dispatch, getState) => {
        try {
          dispatch(notificationSuccess(payload))
        } catch (error) {
            dispatch(notificationFailure(error))
        }
    }
}


const removeNotificationSuccess = (payload) => ({
    type: 'REMOVE_NOTIFICATION_SUCCESS',
    payload
})

const removeNotificationFailure = () => ({
    type: 'REMOVE_NOTIFICATION_FAILURE'
})

export const removeNotification = (payload) => {
    return async (dispatch, getState) => {
        try {
          dispatch(removeNotificationSuccess(payload))
        } catch (error) {
            dispatch(removeNotificationFailure(error))
        }
    }
}