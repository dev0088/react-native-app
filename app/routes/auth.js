/**
 * Auth Scenes
 *
 * RDS Customer Face App
 * https://github.com/ninjarails/reddot-reactnative
 */
import React from 'react';
import {Router, Scene, Stack, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import AppConfig from '../constants/config';
import DefaultProps from '../constants/navigation';
// Scenes
import LoginScreen from '../containers/LoginScreen';
import ForgotPasswordScreen from '../containers/ForgotPasswordScreen';
import SignUpScreen from '../containers/SignUpScreen';
// import {
//   ResetPassword,
// } from '@containers/forms';

/* Routes ==================================================================== */
const scenes = (
	  <Stack key="authenticate">
	    <Scene
	      key="login"
	      component={LoginScreen}
	      analyticsDesc="Login"
	      hideNavBar>
				<Scene
					back
					key="signUp"
					title="SIGN UP"
					{...DefaultProps.navbarProps}
					component={SignUpScreen}
				/>
				<Scene
					back
					key="forgotPassword"
					title="FORGOT PASSWORD"
					{...DefaultProps.navbarProps}
					component={ForgotPasswordScreen}
				/>
			</Scene>
	  </Stack>
);

export default scenes;
