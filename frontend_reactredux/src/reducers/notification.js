const initialState = {
    data: [],
    notif: 0
}

const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION_SUCCESS':
            return {
                ...state,
                data: [...state.data, action.payload],
                notif: state.notif + 1
            }

        case 'NOTIFICATION_FAILURE':
            break;

        case 'REMOVE_NOTIFICATION_SUCCESS':
            return {
                ...state,
                data: action.payload,
                notif: action.payload.length
            }
            
        case 'REMOVE_NOTIFICATION_FAILURE':
            break;
        default:
            return state
    }
}

export default notification