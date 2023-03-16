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
            const response = await request.get('chats')
            if (data.success) {
                let cnt = []
                let temp = data.data
                let chatData = response.data.data
                for (let i = 0; i < temp.length; i++) {
                    if (JSON.parse(localStorage.getItem('user'))?.username !== temp[i].username) {
                        if (payload && !temp[i]) {
                            cnt.push({ username: payload.username, _id: payload._id, unreadCount: payload.unreadCount })
                        } else {
                            cnt.push({ username: temp[i].username, _id: temp[i]._id, unreadCount: 0 })
                        }
                    }
                }

                for (let j = 0; j < chatData.length; j++) {
                    for (let k = 0; k < cnt.length; k++) {
                        if (chatData[j].readstatus === false && chatData[j].sender === cnt[k]._id) {
                            cnt[k].unreadCount = cnt[k].unreadCount + 1
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
