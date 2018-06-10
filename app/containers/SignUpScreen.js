import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Content,
	Text,
	Form,
	Item,
	Label,
	Input,
	Button,
	Body,
	CheckBox,
	ListItem
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../actions/registerActions';
import { Actions } from 'react-native-router-flux';
import { translate } from '../i18n';
import Loading from './Loading';
import Messages from '../components/Messages';
import Header from '../components/Header';
import Spacer from '../components/Spacer';


class SignUpScreen extends React.Component {
  // static propTypes = {
  //   error: PropTypes.string,
  //   loading: PropTypes.bool.isRequired,
  //   locale: PropTypes.string,
  //   onFormSubmit: PropTypes.func.isRequired,
  // }
	//
  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      inviteCode: '',
      userName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      allowNotifications: false,
      acceptedTerms: false,
      school: '',
      club: '',
      city: '',
      state: '',
      careerLocation: '',
      objective: '',
      chapter: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

	handleSignUp = () => {
		const {
			inviteCode,
			userName,
		 	emailAddress,
			password,
			passwordConfirm,
			firstName,
			lastName,
			phoneNumber,
			allowNotifications,
			acceptedTerms,
			school,
			club,
			city,
			careerLocation,
			objective,
			chapter
		} = this.state;

		this.props.actions.registerRequest(
			inviteCode,
			userName,
		 	emailAddress,
			password,
			passwordConfirm,
			firstName,
			lastName,
			phoneNumber,
			allowNotifications,
			acceptedTerms,
			school,
			club,
			city,
			careerLocation,
			objective,
			chapter
		);
	};

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }
	//
  // handleSubmit = () => {
  //   this.props.onFormSubmit(this.state)
  //     .then(() => Actions.login())
  //     .catch(e => console.log(`Error: ${e}`));
  // }

  render() {
    // const { loading, error, locale } = this.props;

    // if (loading) return <Loading />;
		const locale = 'en';
		const { register } = this.props;

    return (
      <Container>
        <Content padder>
					<View padder>
						<Body>
		          <Header
		            title="Welcome"
		            content="We're glad to welcome you to the community. There's only a few questions and you'll be on your way."
		          />
						</Body>
					</View>
					{register.errorMessage && <Messages message={register.errorMessage} />}
					<Spacer size={40} />
					<View>
						<Body>
							<Item regular>
	              <Input
	                placeholder={translate('Invite Code')}
									onChangeText={v => this.handleChange('inviteCode', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('First Name')}
									onChangeText={v => this.handleChange('firstName', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate("Last Name")}
									onChangeText={v => this.handleChange('lastName', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('User Name')}
									onChangeText={v => this.handleChange('lastName', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
									secureTextEntry
	                placeholder={translate('Email')}
									onChangeText={v => this.handleChange('emailAddress', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('Password')}
									onChangeText={v => this.handleChange('password', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
									secureTextEntry
	                placeholder={translate('Confirm Password')}
									onChangeText={v => this.handleChange('passwordConfirm', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
									secureTextEntry
	                placeholder={translate('Phone Number')}
									onChangeText={v => this.handleChange('phoneNumber', v)}
	              />
	            </Item>
							<ListItem>
	              <CheckBox checked={true} onPress={v => this.handleChange('allowNotifications', v)} />
	                <Body>
	                  <Text>Allow Notifications</Text>
	                </Body>
	            </ListItem>
							<ListItem>
	              <CheckBox checked={true} onPress={v => this.handleChange('acceptedTerms', v)} />
	                <Body>
	                  <Text>Accepted Terms</Text>
	                </Body>
	            </ListItem>
							<Item regular>
	              <Input
	                placeholder={translate('School')}
									onChangeText={v => this.handleChange('school', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('Club')}
									onChangeText={v => this.handleChange('club', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('City')}
									onChangeText={v => this.handleChange('city', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('State')}
									onChangeText={v => this.handleChange('state', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('College Major')}
									onChangeText={v => this.handleChange('collegeMajor', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('Career Location')}
									onChangeText={v => this.handleChange('careerLocation', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('Objective')}
									onChangeText={v => this.handleChange('objective', v)}
	              />
	            </Item>
							<Item regular>
	              <Input
	                placeholder={translate('Chapter')}
									onChangeText={v => this.handleChange('chapter', v)}
	              />
	            </Item>
						</Body>
					</View>
					<Spacer size={20} />
					<View>
						<Body>
							<Button onPress={Actions.handleSubmit}>
								<Text>{translate('Signup', locale)}</Text>
							</Button>
						</Body>
					</View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { register } = state;

  return {
    register,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
