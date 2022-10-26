import React from 'react';
import AuthForm from '../components/authForm';

type Props = {};

function SignUp({}: Props) {
	return <AuthForm mode='signUp' />;
}

SignUp.authPage = true;
export default SignUp;
