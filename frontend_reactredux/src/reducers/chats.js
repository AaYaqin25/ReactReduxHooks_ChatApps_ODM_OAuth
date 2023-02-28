let sender = JSON.parse(localStorage.getItem('user'))?.sender

const initialState = {
    data: []
}

const chats = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CHAT_SUCCESS':
            return {
                data: action.payload.map(item => {
                    item.sent = true
                    return item
                })
            }

        case 'LOAD_CHAT_FAILURE':
            break;

        // FOR SENDER
        case 'ADD_CHAT':
            return {
                data: [
                    ...state.data,
                    {
                        _id: action.id,
                        message: action.message,
                        date: action.date,
                        sent: true
                    }
                ]
            }

        case 'ADD_CHAT_SUCCESS':
            return {
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: sender,
                            date: action.payload.date,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'ADD_CHAT_FAILURE':
            return {
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })]
            }

        case 'REMOVE_CHAT_SUCCESS':
            return {
                data: [...state.data.filter(item => item._id !== action.id)]
            }

        case 'REMOVE_CHAT_FAILURE':
            break;
        case 'RESEND_CHAT_SUCCESS':
            return {
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: sender,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        // FOR RECEIVER
        case 'ADD_MESSAGE_SUCCESS':
            return {
                data: [...state.data, action.payload]
            }

        case 'ADD_MESSAGE_FAILURE':
            break;

        case 'REMOVE_MESSAGE_SUCCESS':
            return {
                data: [...state.data.filter(item => item._id !== action.payload)]
            }
        case 'REMOVE_MESSAGE_FAILURE':
            break;

        default:
            return state
    }
}

export default chats