import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure} from './user.actions';

import { auth, 
         googlProvider, 
         createUserProfileDocument,
         getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
    try { 
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get(); 
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        console.log('getSnapshotFromUserAutth', error);
        yield put(signInFailure(error.message));
    }
} 

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googlProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        console.log('signInWithEmail');
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* isUserAuthenticated() {
    try {
        
        const userAuth =  yield getCurrentUser();
        console.log('isUserAuthenticated executed', userAuth);  
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* onGoogleSignInStart() {
    console.log('onGoogleSignInStart');
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle )
}

export function* onEmailSignInStart() {
    console.log('onEmailSignInStart');
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    console.log('saga checkUserSession called');
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), 
               call(onEmailSignInStart),
               call(onCheckUserSession)])
}



