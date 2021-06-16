import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { auth } from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const initalState = {
  email: '',
  password: '',
};

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [fields, setFields] = useState(initalState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = fields;
    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <>
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={fields.email}
            label="Email"
            handleChange={handleChange}
            required
          />

          <FormInput
            type="password"
            name="password"
            value={fields.password}
            label="Password"
            handleChange={handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign with Google
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
