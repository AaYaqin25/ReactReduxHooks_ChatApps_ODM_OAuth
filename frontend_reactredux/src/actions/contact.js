import { request } from '../utils/api';

export const loadContactSuccess = (payload) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    payload
})

const loadContactFailure = () => ({
    type: 'LOAD_CONTACT_FAILURE'
})

export const loadContact = (payload) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('users')
            if (data.success) {
                let cnt = []
                let temp = data.data
                for (let i = 0; i < temp.length; i++) {
                    if (JSON.parse(localStorage.getItem('user'))?.username !== temp[i].username) {
                        if (payload && !temp[i]) {
                            cnt.push({ username: payload.username, _id: payload._id, unreadCount: payload.unreadCount })
                        }  else {
                           cnt.push({ username: temp[i].username, _id: temp[i]._id, unreadCount: 0 })
                        }
                    }
                }
                await dispatch(loadContactSuccess({ cnt }))
            } else {
                alert('gagal load contact')
            }
        } catch (error) {
            dispatch(loadContactFailure(error))
        }
    }
}


// const newUserLoginSuccess = (payload) => ({
//     type: 'NEW_USER_LOGIN_SUCCESS',
//     payload
// })

// const newUserLoginFailure = () => ({
//     type: 'NEW_USER_LOGIN_FAILURE'
// })

// export const newUserLogin = (payload) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(newUserLoginSuccess(payload))
//         } catch (error) {
//             dispatch(newUserLoginFailure(error))
//         }
//     }
// }


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
