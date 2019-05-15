'use strict'

import { CLEAR_LOGIN_FIELDS, CHANGE_EMAIL_VALUE, CHANGE_PASSWORD_VALUE } from "./actionTypes"

export const clearFields = () => ({ type: CLEAR_LOGIN_FIELDS })

export const changeEmail = (value) => ({
    type: CHANGE_EMAIL_VALUE,
    email: value
})

export const changePassword = (value) => ({
    type: CHANGE_PASSWORD_VALUE,
    password: value
})