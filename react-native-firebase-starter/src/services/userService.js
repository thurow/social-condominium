import firebase from 'react-native-firebase';

const createNewUser = async (uid, { firstName, lastName }) => {
    console.log('Creating user {} of uid {}', firstName, uid)
    await firebase.firestore().collection('users').doc(uid).set({
        firstName,
        lastName
    })
}

const createUserIfNotExists = async (uid, { firstName, lastName }) => {
    const user = await firebase.firestore().collection('users').doc(uid).get()
    if (!user.exists) {
        await createNewUser(uid, { firstName, lastName })
    }

}

export default {
    createNewUser,
    createUserIfNotExists
}