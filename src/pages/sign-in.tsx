import React from 'react';
import AuthForm from '../components/authForm';

type Props = {};

function SignIn({}: Props) {
	return <AuthForm mode='signIn' />;
}

SignIn.authPage = true;

export default SignIn;
