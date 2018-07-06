import React, { Component } from 'react'
import {
	StatusBarIOS,
	Text,
	View,
	Navigator,
	StyleSheet,
	StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'

import { Router, Scene, Stack } from 'react-native-router-flux'
import { Actions } from 'react-native-router-flux'

import DefaultProps from '../constants/navigation'
import AppConfig from '../constants/config'
import AuthScenes from './auth'
// import LoginScreen from '../containers/LoginScreen';
import HomeScreen from '../containers/HomeScreen'
import InteractScreen from '../containers/InteractScreen'
import InteractRumScreen from '../containers/InteractRumScreen'
import ContactInfoScreen from '../containers/ContactInfoScreen'
import LocaleScreen from '../containers/LocaleScreen'

import LoginScreen from '../containers/LoginScreen'
import ForgotPasswordScreen from '../containers/ForgotPasswordScreen'
import SignUpScreen from '../containers/SignUpScreen'
import TermScreen from '../containers/TermScreen'
import PolicyScreen from '../containers/PolicyScreen'

class TabIcon extends Component {
	render() {
		return (
			<View>
				<Icon name={this.props.iconName || 'circle'} size={18} />
				<Text>{this.props.title}</Text>
			</View>
		)
	}
}

class UpperNetwork extends Component {
	componentDidMount() {
		StatusBar.setBarStyle('light-content')
		if (this.props.isAuthenticated) {
			Actions.push('home')
		}
	}

	render() {
		return (
			<Router>
				<Stack>
					<Scene key="auhenticateScene" hideNavBar>
						<Stack key="authenticate">
							<Scene
								key="login"
								component={LoginScreen}
								analyticsDesc="Login"
								hideNavBar
							/>
							<Scene
								back
								key="signUp"
								title="Create Account"
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
							<Scene
								back
								key="term"
								title="Terms and Service"
								{...DefaultProps.navbarProps}
								component={TermScreen}
							/>
							<Scene
								back
								key="policy"
								title="Privacy Policy"
								{...DefaultProps.navbarProps}
								component={PolicyScreen}
							/>
						</Stack>
					</Scene>
					<Scene key="root">
						<Scene
							key="tabbar"
							tags={true}
							default="home"
							type="reset"
							duration={1}
						>
							<Scene
								key="home"
								title="HomeScreen"
								icon={TabIcon}
								hideNavBar={true}
								component={HomeScreen}
							/>
							<Scene
								key="interact"
								title="Interact"
								icon={TabIcon}
								hideNavBar={true}
								component={InteractScreen}
							/>
							<Scene
								key="rum"
								title="Interact"
								icon={TabIcon}
								hideNavBar={true}
								component={InteractRumScreen}
							/>
							<Scene
								key="contact"
								title="Contact Info"
								icon={TabIcon}
								hideNavBar={true}
								component={ContactInfoScreen}
							/>
						</Scene>
					</Scene>
				</Stack>
			</Router>
		)
	}
}

const mapStateToProps = function(state) {
	const { user } = state
	return {
		isAuthenticated: user.isAuthenticated
	}
}

export default connect(mapStateToProps)(UpperNetwork)
