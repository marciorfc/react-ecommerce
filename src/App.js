import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import { auth, createUserProfileDocument, addCollectionsAndDocuments, getCollectionsAndDocuments  } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from './redux/user/user.actions';

function App({ currentUser, checkUserSession, setCurrentUser, collectionsArray }) {

  useEffect(() => {
    checkUserSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => console.log('currentUser', currentUser), [currentUser]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
