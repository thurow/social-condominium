import firebase from 'react-native-firebase';

const createNewUser = async (uid, { firstName, lastName, condominium }) => {
    console.log('Creating user {} of uid {}', firstName, uid)
    return await firebase.firestore().collection('users').doc(uid).set({
        firstName,
        lastName,
        condominium
    })
}

const createUserIfNotExists = async (uid, { firstName, lastName, condominium }) => {
    const user = await firebase.firestore().collection('users').doc(uid).get()
    if (!user.exists) {
        return await createNewUser(uid, { firstName, lastName, condominium })
    }
    return user
}

export default {
    createNewUser,
    createUserIfNotExists
}