const initialState = {
    data: []
}

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            return {
                data: action.payload
            }

        case 'LOAD_CONTACT_FAILURE':
            break;

        default:
            return state
    }
}

export default contacts