import { request } from '../utils/api';

const loadContactSuccess = (payload) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    payload
})

const loadContactFailure = () => ({
    type: 'LOAD_CONTACT_FAILURE'
})

export const loadContact = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('users')
            if (data.success) {
                let cnt = []
                let temp = data.data
                for (let i = 0; i < temp.length; i++) {
                    if (JSON.parse(localStorage.getItem('user'))?.username !== temp[i].username) {
                        cnt.push(temp[i].username)
                    }
                }
                dispatch(loadContactSuccess(cnt))
            } else {
                alert('gagal load contact')
            }
        } catch (error) {
            dispatch(loadContactFailure(error))
        }
    }
}