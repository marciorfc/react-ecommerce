import { all, put, takeLatest, call } from "redux-saga/effects"

import UserActionTypes from '../../redux/user/user.types';
import { clearCart } from '../../redux/cart/cart.actions';

export function* cleanCart() {
    try {
        yield put(clearCart());
    } catch (error) {
        
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, cleanCart);
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess)
           ]);
}