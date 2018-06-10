import React, {Component} from 'react';
import {StatusBarIOS, Text, View, Navigator, StyleSheet, StatusBar} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Router, Scene, Stack } from 'react-native-router-flux';

import DefaultProps from '../constants/navigation';
import AppConfig from '../constants/config';

import AuthScenes from './auth';
// import LoginScreen from '../containers/LoginScreen';
import HomeScreen from '../containers/HomeScreen';
// import ForgotPasswordScreen from '../containers/ForgotPasswordScreen';
// import SignUpScreen from '../containers/SignUpScreen';
import LocaleScreen from '../containers/LocaleScreen';

import LoginScreen from '../containers/LoginScreen';
import ForgotPasswordScreen from '../containers/ForgotPasswordScreen';
import SignUpScreen from '../containers/SignUpScreen';

class TabIcon extends Component {
  render() {
    return (
      <View>
        <Icon name={this.props.iconName || "circle"} size={18} />
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

class UpperNetwork extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    const { isAuthenticated } = this.props;

    return (

        <Router>
					<Stack>
						<Scene hideNavBar>
							<Stack key="authenticate">
								<Scene
									key="login"
									component={LoginScreen}
									analyticsDesc="Login"
									hideNavBar
									initial={!isAuthenticated}
								/>
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
							</Stack>
						</Scene>
						<Scene key="root">
	            <Scene key="tabbar" tags={true} default="home" type="reset" duration={1}>
	              <Scene
	                key="home"
	                title="HomeScreen"
	                icon={TabIcon}
	                hideNavBar={true}
	                component={HomeScreen}
								/>
							</Scene>
          	</Scene>
				</Stack>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.98
  },
  navigationBarStyle: {
    backgroundColor: '#00f'
  },
  navigationBarTitleStyle: {
    color:'white'
  },
  navigationBarleftButtonTextStyle:{
    color:'white'
  },
  navTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  tabItem: {
    flex: 1,
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = function(state) {
  const { user } = state;
  return {
    isAuthenticated: user.isAuthenticated,
  }
};

export default connect(mapStateToProps)(UpperNetwork);
