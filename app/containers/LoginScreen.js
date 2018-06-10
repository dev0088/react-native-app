import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Button,
  View,
  Body,
  Thumbnail,
  H1,
  H2,
  H3
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import { Actions } from 'react-native-router-flux';
import { translate } from '../i18n';
import Messages from '../components/Messages';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Logo from '../images/logo.png'

class LoginScreen extends Component {
	static propTypes = {
		locale: PropTypes.string,
		error: PropTypes.string
	};

  state = {
    email: 'bond@007.com',
    password: 'asdfasdf1',
  };

  loginEmail = () => {
    const { email, password } = this.state;

    // console.log(email, password, this.props.actions);

    this.props.actions.loginRequest(email, password);
    //Actions.main();
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;

    return (
      <Container>
				<Content>
					<View padder>
						<Spacer size={25} />
						<Body>
							<Thumbnail source={require('../images/logo.png')} />
						</Body>
					</View>
					<View padder>
	          <Body >
	            <H2 block>Welcome to</H2>
	            <H1 block>Upper Network!</H1>
						</Body>
						<Spacer size={40} />
						<Body>
	            <Item regular>
	              <Input
	                placeholder="Email"
	                onChangeText={email => this.setState({email})}
	                value={email}
	              />
	            </Item>
							<Spacer size={10} />
	            <Item regular>
	              <Input
	                placeholder="Password"
	                secureTextEntry={true}
	                onChangeText={password => this.setState({password})}
	                value={password}
	              />
	            </Item>
	            {user.errorMessage && <Messages message={user.errorMessage} />}
							<Spacer size={20} />
						</Body>
						<Body>
							<View padder>
								<Button onPress={this.loginEmail}>
									<Text>{translate('Login', 'en')}</Text>
								</Button>
							</View>
							<View style={{flex: 1}} />
							<View padder>
	              <Text onPress={() => Actions.push('forgotPassword')}>
									{translate('ForgotPassword', 'en')}
								</Text>
		          </View>
							<View padder>
								<Button onPress={() => Actions.push('signUp')}>
									<Text>{translate('Signup', 'en')}</Text>
								</Button>
							</View>
						</Body>
					</View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  button: {
    backgroundColor: "#2F7E78",
    borderRadius: 0,
    width: 150,
    margin: 12,
    alignSelf: 'center'
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
