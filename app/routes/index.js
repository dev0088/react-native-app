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
import SelfScreen from '../containers/SelfScreen'
import EditProfileScreen from '../containers/EditProfileScreen'

import LoginScreen from '../containers/LoginScreen'
import ForgotPasswordScreen from '../containers/ForgotPasswordScreen'
import SignUpScreen from '../containers/SignUpScreen'
import WelcomeScreen from '../containers/WelcomeScreen'
import TermScreen from '../containers/TermScreen'
import PolicyScreen from '../containers/PolicyScreen'
import IntroduceInteractScreen from '../containers/IntroduceInteractScreen'
import IntroduceLearnScreen from '../containers/IntroduceLearnScreen'
import IntroduceTrackScreen from '../containers/IntroduceTrackScreen'
import IntroduceSelfScreen from '../containers/IntroduceSelfScreen'
import IntroduceReadyToBeginScreen from '../containers/IntroduceReadyToBeginScreen'
import WelcomeToPursuitScreen from '../containers/WelcomeToPursuitScreen'

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
								hideNavBar={true}
								component={SignUpScreen}
							/>
							<Scene
								back
								key="forgotPassword"
								title="FORGOT PASSWORD"
								hideNavBar={true}
								component={ForgotPasswordScreen}
							/>
							<Scene
								back
								key="term"
								title="Terms and Service"
								hideNavBar={true}
								component={TermScreen}
							/>
							<Scene
								back
								key="policy"
								title="Privacy Policy"
								hideNavBar={true}
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
								default="home"
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
								key="self"
								title="Self"
								icon={TabIcon}
								hideNavBar={true}
								component={SelfScreen}
							/>
							<Scene
								key="editProfile"
								title="Edit Profile"
								icon={TabIcon}
								hideNavBar={true}
								component={EditProfileScreen}
							/>
							<Scene
								key="contact"
								title="Contact Info"
								icon={TabIcon}
								hideNavBar={true}
								component={ContactInfoScreen}
							/>
							<Scene
								key="welcome"
								component={WelcomeScreen}
								analyticsDesc="Welcome"
								hideNavBar
							/>
							<Scene
								key="introduceInteract"
								title="Interact"
								icon={TabIcon}
								hideNavBar={true}
								component={IntroduceInteractScreen}
							/>
							<Scene
								key="introduceLearn"
								title="Learn"
								icon={TabIcon}
								hideNavBar={true}
								component={IntroduceLearnScreen}
							/>
							<Scene
								key="introduceTrack"
								title="Track"
								icon={TabIcon}
								hideNavBar={true}
								component={IntroduceTrackScreen}
							/>
							<Scene
								key="introduceSelf"
								title="Self"
								icon={TabIcon}
								hideNavBar={true}
								component={IntroduceSelfScreen}
							/>
							<Scene
								key="introduceReadyToBegin"
								title="Ready To Begin"
								icon={TabIcon}
								hideNavBar={true}
								component={IntroduceReadyToBeginScreen}
							/>
							<Scene
								key="introduceWelcomeToPursuit"
								title="Welcome to Pursuit"
								icon={TabIcon}
								hideNavBar={true}
								component={WelcomeToPursuitScreen}
							/>
						</Scene>
					</Scene>
				</Stack>
			</Router>
		)
	}
}

const mapStateToProps = function(state) {
	const { auth } = state
	return {
		isAuthenticated: auth.isAuthenticated
	}
}

export default connect(mapStateToProps)(UpperNetwork)
