import { request } from "../utils/api";
import socket from '../socket';

const loadChatSuccess = (payload) => ({
    type: 'LOAD_CHAT_SUCCESS',
    payload
})

const loadChatFailure = () => ({
    type: 'LOAD_CHAT_FAILURE'
})

export const loadChat = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('chats')
            if (data.success) {
                dispatch(loadChatSuccess(data.data))
            } else {
                alert('gagal load message')
            }
            console.log(data.data, 'ini load pertama');
        } catch (error) {
            dispatch(loadChatFailure(error))
        }
    }
}


// FOR SENDER
const addChatSuccess = (id, payload) => ({
    type: 'ADD_CHAT_SUCCESS',
    id,
    payload
})


const addChatFailure = (id) => ({
    type: 'ADD_CHAT_FAILURE',
    id
})


const addChatRedux = (id, message) => ({
    type: 'ADD_CHAT',
    id,
    message
})

export const addChat = (message, name) => {
    const id = Date.now()
    return async (dispatch, getState) => {
        dispatch(addChatRedux(id, message))
        try {
            let sender = JSON.parse(localStorage.getItem('user'))?.sender
            const { data } = await request.post('chats', { message, sender })
            if (data.success) {
                socket.emit('send message', { _id: data.data._id, message, to: name })
                dispatch(addChatSuccess(id, data.data))
            } else {
                alert('gagal send message')
            }
        } catch (error) {
            dispatch(addChatFailure(id))
        }
    }
}


const removeChatSuccess = (id) => ({
    type: 'REMOVE_CHAT_SUCCESS',
    id
})


const removeChatFailure = () => ({
    type: 'REMOVE_CHAT_FAILURE',
})

export const removeChat = (_id, name) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`chats/${_id}`)
            if (data.success) {
                socket.emit('delete message', { _id, to: name })
                dispatch(removeChatSuccess(_id))
            } else {
                alert('gagal delete message')
            }
        } catch (error) {
            dispatch(removeChatFailure(error))
        }
    }
}


const resendChatSuccess = (id, payload) => ({
    type: 'RESEND_CHAT_SUCCESS',
    id,
    payload
})


const resendChatFailure = () => ({
    type: 'RESEND_CHAT_FAILURE',
})

export const resendChat = (_id, message, sender, name) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post('chats', { message, sender })
            if (data.success) {
                socket.emit('send message', { _id: data.data._id, message, to: name })
                socket.emit('join room', JSON.parse(localStorage.getItem('user'))?.username)
                dispatch(resendChatSuccess(_id, data.data))
            } else {
                alert('gagal resend')
            }
        } catch (error) {
            dispatch(resendChatFailure(error))
        }
    }
}

// FOR RECEIVER
const addMessageSuccess = (payload) => ({
    type: 'ADD_MESSAGE_SUCCESS',
    payload
})

const addMessageFailure = () => ({
    type: 'ADD_MESSAGE_FAILURE'
})


export const addMessage = (payload) => {
    return (dispatch, getState) => {
        try {
            dispatch(addMessageSuccess(payload))
        } catch (error) {
            dispatch(addMessageFailure(error))
        }
    }
}

const removeMessageSuccess = (payload) => ({
    type: 'REMOVE_MESSAGE_SUCCESS',
    payload
})

const removeMessageFailure = () => ({
    type: 'REMOVE_MESSAGE_FAILURE'
})


export const removeMessage = (payload) => {
    return (dispatch, getState) => {
        try {
            dispatch(removeMessageSuccess(payload))
        } catch (error) {
            dispatch(removeMessageFailure(error))
        }
    }
}
