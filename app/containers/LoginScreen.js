import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Footer,
  FooterTab,
  Item,
  Label,
  Input,
  Left,
  List,
  ListItem,
  Text,
  Button,
  View,
  Body,
  Thumbnail,
  H1,
  H2,
  H3,
  Spinner
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import * as loginActions from '../actions/loginActions';
import { translate } from '../i18n';
import Messages from '../components/Messages';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Logo from '../images/logo.png'
const {width, height} = Dimensions.get('window');
console.log(height);

const styles = StyleSheet.create({
	content: {
    padding: 44,
    height: (height - 88),
  },
  button: {
  	paddingTop: 2,
  	paddingBottom: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 41,
  },
  transparentButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
  	fontSize: 18,
    lineHeight: 21,
    color: '#FFF',
    textAlign: 'center',
  },
  input: {
  	paddingLeft: 0, 
  	paddingRight: 0,
  	color: '#FFF',
  	fontSize: 16,
  	lineHeight: 19,
  },
  imageBackground: {
    width: '100%',
    height: height,
  },
})

class LoginScreen extends Component {
	static propTypes = {
		locale: PropTypes.string,
		error: PropTypes.string,
	};

  state = {
    email: 'bond@007.com',
    password: 'asdfasdf1',
    loginRequest: false,
  };
  componentDidMount = () => {
    this.props.actions.loginInit();
  }
  loginEmail = () => {
    const { email, password } = this.state;
    this.setState({ loginRequest: true });
    // console.log(email, password, this.props.actions);
    this.props.actions.loginRequest(email, password);
    //Actions.main();
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;
    const locale = 'en';
    return (
      <Container>
				<Content>
          <ImageBackground 
                style={styles.imageBackground} 
                source={require('../images/background.png')} >
            <View style={styles.content}>
  						<Spacer size={41} />
  						<Thumbnail 
  							style={{ alignSelf: "center" }} 
  							source={require('../images/logo.png')} />
  						<Spacer size={40} />
  						<Body>
  	            <Item>
  	              <Input
  	              	style={styles.input}
  	                placeholder="Email"
  	                onChangeText={email => this.setState({email})}
  	                value={email} />
  	            </Item>
  							<Spacer size={10} />
  	            <Item >
  	              <Input
  	              	style={styles.input}
  	                placeholder="Password"
  	                secureTextEntry={true}
  	                onChangeText={password => this.setState({password})}
  	                value={password} />
  	            </Item>
  	            <Spacer size={10} />
  	            {user.errorMessage && <Messages message={user.errorMessage} />}
  							<Spacer size={20} />
  							<Button 
  								full 
  								onPress={this.loginEmail}
  								style={styles.button} >
  								<Text style={styles.buttonText}>
                    {translate('Login', locale)}
                  </Text>
                  {this.state.loginRequest && <Spinner color='white' size="small" />}
  							</Button>
  							<Spacer size={80} />
  							<Button 
  								full
  								style={styles.transparentButton} 
  								onPress={() => Actions.push('forgotPassword')} >
  								<Text style={styles.buttonText}>{translate('ForgotPassword', locale)}</Text>
  							</Button>
  							<Button 
  								full
  								style={styles.button} 
  								onPress={() => Actions.push('signUp')} >
  								<Text style={styles.buttonText}>{translate('Signup', locale)}</Text>
  							</Button>
						  </Body>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
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
