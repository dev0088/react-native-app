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
  Right,
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
  Spinner,
  Header
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,
	ImageBackground,
	Image,
	Modal,
	Linking
} from 'react-native';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import * as loginActions from '../actions/loginActions';
import * as organizationActions from '../actions/organizationActions';
import { translate } from '../i18n';
import Messages from '../components/Messages';
import Spacer from '../components/Spacer';
import Logo from '../images/logo.png'
import defaultValues from '../constants/defaultValues'

const {width, height} = Dimensions.get('window');

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
  	content: {
      padding: 44,
      height: (height - 88),

    },
    logoView: {
      display: 'flex'
    },
    logoViewHeader: {
      backgroundColor: 'transparent',
      height: 70,
      paddingTop: 0,
      borderBottomWidth: 0,
      shadowOpacity: 0.5
    },
    logoImage: {
      width: 65,
      height:65,
      alignItems: 'flex-end'
    },
    logoTitleImage: {
      width: 150,
      height: 55,
      alignItems: 'flex-start'
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
  	alertMainView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 144,
      width: '70%',
      borderWidth: 1,
      backgroundColor: '#FFF',
      borderColor: '#CCC',
      borderRadius: 7
    },
    alertTitle: {
      fontSize: 15,
      color: '#000',
      textAlign: 'center',
      paddingTop: 20,
      height: '28%',
      fontWeight: 'bold'
    },
    alertMessage: {
      fontSize: 13,
      color: '#111',
      textAlign: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      height: '47%'
    },
    alertVerticalDivider: {
      width: '100%',
      height: 1,
      backgroundColor: '#CDCED2'
    },
    alertHorizontalDivider: {
      width: 1,
      height: '100%',
      backgroundColor: '#CDCED2'
    },
    buttonStyle: {
      color: '#0076FF',
      textAlign: 'center',
      fontSize: 17,
      padding: 6,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      fontWeight: 'bold'
    }
  })
}

class LoginScreen extends Component {
	static propTypes = {
		locale: PropTypes.string,
		error: PropTypes.string,
	};

	constructor(props) {
    super(props);
		this.state = {
	    userName: defaultValues.DEFAULT_USER_NAME,
	    password: defaultValues.DEFAULT_USER_PASSWORD,
	    loginRequest: false,
			forgetpasswordVisible: false,
      logo: require('../images/logo.png'),
      styles: createStyleSheet(props.organization.organizationColor)
	  };
	 }

	componentDidMount = () => {
    // this.props.actions.loginInit();
		this.props.organizationActions.organizationInit();
		this.props.organizationActions.organizationRequest();
    let { organization } = this.props
    if (organization && organization.logoFilename) {
      this.setState({
        logo: {uri: defaultValues.DEFAULT_LOGO_URL + organization.logoFilename}
      })
    }
  }

	componentWillReceiveProps = (nextProps) => {
    let { auth, organization } = nextProps
    let { userName, password, loginRequest, logo, styles } = this.state
    this.setState ({
      userName: auth && auth.userName ? auth.userName : userName,
      password: auth && auth.password ? auth.password: password,
      loginRequest: auth && auth.errorMessage ? false : loginRequest,
      logo: organization && organization.logoFilename ? {uri: defaultValues.DEFAULT_LOGO_URL + organization.logoFilename} : logo,
      styles: organization && organization.developerJson ? createStyleSheet(organization.developerJson) : styles
    })
	};

  handleLogin = () => {
    const { userName, password } = this.state;
    this.setState({ loginRequest: true });
    this.props.actions.loginRequest(userName, password);
  };

	handleFogetPassword = () => {
		this.setState({ forgetpasswordVisible: true })
	}

  render() {
    const { userName, password, logo, styles } = this.state;
    const { auth } = this.props;
    const locale = 'en';
    return (
      <Container>
				<Content>
          <ImageBackground
                style={styles.imageBackground}
                source={require('../images/background.png')} >
            <View style={styles.content}>
  						<Spacer size={50} />
              <Header noShadow style={styles.logoViewHeader}>
                <Left style={{flex: 1}}>
                  <Image
                    style={styles.logoImage}
                    source={logo}
                    resizeMode={Image.resizeMode.contain} />
                </Left>

                <Body style={{flex: 2}}>
                  <Image
                    style={styles.logoTitleImage}
                    source={require('../images/logo_title.png')}
                    resizeMode={Image.resizeMode.contain} />
                </Body>
              </Header>
  						<Spacer size={50} />
  						<Body>
  	            <Item>
  	              <Input
  	              	style={styles.input}
  	                placeholder="User Name"
  	                onChangeText={userName => this.setState({userName})}
  	                value={userName} />
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
  	            {auth.errorMessage && <Messages message={auth.errorMessage} />}
  							<Spacer size={20} />
  							<Button
  								full
  								onPress={this.handleLogin}
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
  								onPress={() => this.handleFogetPassword()} >
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
					<Modal
            visible={this.state.forgetpasswordVisible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              this.setState({ forgetpasswordVisible: false })
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View style={styles.alertMainView}>
                <Text style={styles.alertTitle}>
                  {translate('Reset Password', locale)}
                </Text>
                <Text style={styles.alertMessage}>
                  {translate('Do you want to reset the password?', locale)}
                </Text>
                <View style={styles.alertVerticalDivider} />
                <View
                  style={{
                    flexDirection: 'row',
                    height: '25%'
                  }}
                >
                  <Text
                    style={styles.buttonStyle}
                    onPress={() => {
                      this.setState({ forgetpasswordVisible: false })
                    }}
                  >
                    {translate('Cancel', locale)}
                  </Text>
                  <View style={styles.alertHorizontalDivider} />
                  <Text
                    style={styles.buttonStyle}
                    onPress={() => {
                      Linking.openURL(
                        'http://portal.mentorscore.com/App/Account/ForgotPassword'
                      )
                      this.setState({
                        forgetpasswordVisible: false
                      })
                    }}
                  >
                    {translate('OK', locale)}
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { auth, organization } = state;

  return {
    auth,
		organization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
		organizationActions: bindActionCreators(organizationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
