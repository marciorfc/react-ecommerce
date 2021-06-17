import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, emailSignInStart } from './user.actions';

import { auth, googlProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
    const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get(); 
        console.log(userRef);
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        yield put(signInFailure(error.message));
    }
} 

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googlProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get(); 
        console.log(userRef);
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    } catch (error) {
        yield put(signInFailure(error.message));
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



