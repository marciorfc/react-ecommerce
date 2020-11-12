import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      setForm(initialState);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="sign-up">
      <div className="title">I do not have a account</div>
      <span>Sign up with you email and password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
