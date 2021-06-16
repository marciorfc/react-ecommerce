import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { googleSignInSuccess, googleSignInFailure, emailSignInStart, emailSignInFailure,
         emailSignInSuccess } from './user.actions';

import { auth, googlProvider, createUserProfileDocument } from '../../firebase/firebase.utils';


export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googlProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get(); 
        console.log(userRef);
        yield put(googleSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        yield put(googleSignInFailure(error.message));
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    } catch (error) {
        yield put(emailSignInFailure(error.message));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle )
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}



