import React, { useState } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { signInWithGoogle } from '../../firebase/firebase.utils';

const initalState = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [fields, setFields] = useState(initalState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFields(initalState);
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
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign with Google
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
