'use strict'

import { CLEAR_LOGIN_FIELDS, CHANGE_EMAIL_VALUE, CHANGE_PASSWORD_VALUE } from "./actionTypes"

export const clearFields = () => ({
    type: CLEAR_LOGIN_FIELDS
})

export const changeEmail = (email) ({
    type: CHANGE_EMAIL_VALUE,
    email: email
})

export const changePassword = (password) ({
    type: CHANGE_PASSWORD_VALUE,
    password: password
})