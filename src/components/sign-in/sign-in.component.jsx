import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
	googleSignInStart,
	emailSignInStart
} from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: ''
	});

	const { email, password } = userCredentials;

	const handleSubmit = async e => {
		e.preventDefault();

		emailSignInStart(email, password);
	};

	const handleChange = e => {
		e.preventDefault();

		const { name, value } = e.target;

		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<form className="sign-in" onSubmit={handleSubmit}>
			<h2 className="title">I already have an account</h2>
			<span>Sign in with your email and password</span>
			<FormInput
				name="email"
				type="email"
				handleChange={handleChange}
				value={email}
				label="email"
				required
			/>
			<FormInput
				name="password"
				type="password"
				handleChange={handleChange}
				value={password}
				label="password"
				required
			/>
			<div className="buttons">
				<CustomButton type="submit">Sign In</CustomButton>
				<CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
					{' '}
					Sign in with Google{' '}
				</CustomButton>
			</div>
		</form>
	);
};

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password }))
});

export default connect(
	null,
	mapDispatchToProps
)(SignIn);
