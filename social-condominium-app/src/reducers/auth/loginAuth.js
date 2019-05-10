import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    email: '',
    password: '',
}

const changeEmailValue = (state, newValue) => {
    return updateObject(state, { email: newValue })
}

const changePasswordValue = (state, newValue) => {
    return updateObject(state, { password: newValue })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_LOGIN_FIELDS:
            return updateObject(state, initialState)
        case actionTypes.CHANGE_EMAIL_VALUE:
            return changeEmailValue(state, action.email)
        case actionTypes.CHANGE_PASSWORD_VALUE:
            return changePasswordValue(state, action.password)
        default:
            return state
    }
}

export default reducer