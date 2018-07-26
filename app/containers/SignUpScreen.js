import React from 'react'
import PropTypes from 'prop-types'
import {
	Container,
	Content,
	Header,
	Left,
	Right,
	Icon,
	Title,
	Text,
	Form,
	Item,
	Label,
	Input,
	Button,
	Body,
	CheckBox,
	ListItem,
	Thumbnail,
	View,
	H1,
	Spinner
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as registerActions from '../actions/registerActions'
import * as loginFromRegistrationActions from '../actions/loginFromRegistrationActions'
import { Actions } from 'react-native-router-flux'
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Modal } from 'react-native'
import { translate } from '../i18n'
import Loading from './Loading'
import Messages from '../components/Messages'
import Spacer from '../components/Spacer'
import defaultValues from '../constants/defaultValues'
import * as uiColor from '../constants/uiColor'

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
		opacity: {
			opacity: 0.8
		},
		content: {
			padding: 44
		},
		header: {
			backgroundColor: uiColor.getSecondaryColor(organizationColor)
		},
		headerTitle: {
			color: '#FFF',
			fontSize: 18,
			alignSelf: 'center'
		},
		topTitle: {
			color: uiColor.getSecondaryColor(organizationColor),
			fontSize: 16,
			textAlign: 'center'
		},
		button: {
			backgroundColor: '#7E888D'
		},
		validateButton: {
			backgroundColor: uiColor.getPrimaryColor(organizationColor)
		},
		buttonText: {
			color: '#FFF',
			fontSize: 18
		},
		thumbnail: {
			alignSelf: 'center',
			height: 35,
			width: 35
		},
		input: {
			color: uiColor.getSecondaryColor(organizationColor)
		},
		note: {
			fontSize: 10,
			color: '#A1A1A1'
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
			fontSize: 14,
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
		},
		alertTerm: {
			fontSize: 13,
			color: '#000',
			textAlign: 'center',
			marginTop: 15,
			paddingLeft: 5,
			paddingRight: 5,
			textDecorationLine: 'underline',
			textDecorationStyle: 'solid',
			textDecorationColor: '#000',
			fontWeight: 'bold'
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
		slideShow: {
			display: 'flex'
		},
		slideHide: {
			display: 'none'
		},
		validateJobButton: {
			backgroundColor: uiColor.getSecondaryColor(organizationColor),
			height: 80,
			padding: 10
		},
		jobButton: {
			backgroundColor: '#B7BABD',
			height: 80,
			padding: 10
		},
		jobButtonText: {
			fontSize: 20,
			color: '#FFF'
		},
		jobButtonNoteText: {
			fontSize: 14,
			color: '#FFF'
		}
	})
}

const TermsAlertView = (
	<Text>
		By creating an account, you agree to the
		<Text>Privacy of Service</Text> and
		<Text>Privacy Policy</Text>.
	</Text>
)

class SignUpScreen extends React.Component {

	static defaultProps = {
		error: null
	}

	constructor(props) {
		super(props)
		this.state = {
			styles: createStyleSheet(props.organizationColor),
			apiKey: '',
			emailAddress: '',
			password: '',
			passwordConfirm: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			tempCode: defaultValues.DEFAULT_INVITE_CODE, //'0vvJKn',
			inviteCode: '',
			userName: '',
			school: defaultValues.DEFAULT_SCHOOL,
			objective: defaultValues.DEFAULT_OBJECTIVE,
			chapter: defaultValues.DEFAULT_CHAPTER,
			nextButtonValidate: false,
			errorMessages: [],
			errorShow: false,
			alertVisible: false,
			currentSlide: 0,
			jobType: 0,
			showSuccessAlert: false,
			showFailureAlert: false,
			registerRequest: false,
			logo: props.organizationLogo ? {uri: defaultValues.DEFAULT_LOGO_URL + props.organizationLogo} : require('../images/logo.png')
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleNext = this.handleNext.bind(this)
		this.showAlert = this.showAlert.bind(this)
		this.showTerm = this.showTerm.bind(this)
		this.showPolicy = this.showPolicy.bind(this)
		this.setJobType = this.setJobType.bind(this)
	}

	handleSignUp = () => {
		const {
			jobType,
			tempCode,
			inviteCode,
			showSuccessAlert,
			showFailureAlert
		} = this.state
		// check the inviteCode is same as tempCode
		if (inviteCode !== tempCode) {
			let result = []
			const locale = 'en'
			result[7] = translate('Enter validate invite code', locale)
			this.setState({
				errorShow: true,
				errorMessages: result
			})
			// console.log(this.state.errorMessages)
			// console.log(this.state.errorShow)
		}
		const { register } = this.props

		if (
			jobType > 0 &&
			inviteCode === tempCode &&
			!showSuccessAlert &&
			!showFailureAlert &&
			!register.isRegistered
		) {
			const {
				emailAddress,
				password,
				passwordConfirm,
				firstName,
				lastName,
				phoneNumber,
				inviteCode,
				userName,
				school,
				objective,
				chapter,
			} = this.state
			this.setState({ registerRequest: true })

			this.props.actions.registerRequest(
				emailAddress,
				password,
				passwordConfirm,
				firstName,
				lastName,
				phoneNumber,
				inviteCode,
				userName,
				school,
				objective,
				chapter
			)
		}
	}

	validateEmail = email => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	validateNumber = number => {
		var re = /^[\d\.\-]+$/
		return re.test(number)
	}

	checkValidataion = () => {
		const {
			emailAddress,
			password,
			passwordConfirm,
			firstName,
			lastName,
			phoneNumber,
			userName
		} = this.state
		const locale = 'en'
		let result = [],
			validate = true
		if (firstName == '') {
			result[0] = translate('Input first name', locale)
			validate = false
		}
		if (lastName == '') {
			result[1] = translate('Input last name', locale)
			validate = false
		}
		if (emailAddress == '') {
			result[2] = translate('Input email address', locale)
			validate = false
		} else if (!this.validateEmail(emailAddress)) {
			result[2] = translate('Input validate email', locale)
			validate = false
		}
		if (userName == '') {
			result[3] = translate('Input user name', locale)
			validate = false
		}
		if (password == '') {
			result[4] = translate('Input password', locale)
			validate = false
		}
		else if (password.length < 8){
			result[4] = translate('Input at least 8 characters', locale);
			validate = false;
		}
		if (passwordConfirm == '' || passwordConfirm != password) {
			result[5] = translate('Input the same confirm password', locale)
			validate = false
		}
		if (!this.validateNumber(phoneNumber)) {
			result[6] = translate('Input the correct number', locale)
			validate = false
		}
		this.setState({
			errorMessages: result,
			nextButtonValidate: validate,
			errorShow: false
		})
		return validate
	}

	handleChange = (name, val) => {
		this.setState(
			{
				...this.state,
				[name]: val
			},
			() => {
				this.checkValidataion()
			}
		)
	}

	handleNext = () => {
		const { nextButtonValidate } = this.state
		if (nextButtonValidate) {
			this.props.actions.registerInit()
			this.props.autoLoginActions.loginInitFromRegistration()
			this.showAlert(true)
		} else {
			this.setState({ errorShow: true })
		}
	}

	generateCode = () => {
		this.setState({ tempCode: defaultValues.DEFAULT_INVITE_CODE })
	}

	showAlert = b => {
		if (b) this.generateCode()
		this.setState({ alertVisible: b })
	}

	showTerm = () => {
		this.showAlert(false)
		Actions.push('term')
	}

	showPolicy = () => {
		this.showAlert(false)
		Actions.push('policy')
	}

	clickAgree = () => {
		this.showAlert(false)
		this.setState({ currentSlide: 1 })
	}
	setJobType = type => {
		this.setState({ jobType: type })
	}

	componentDidMount = () => {
		this.isMounted = true
		if (this.isMounted) {
			this.checkValidataion()
		}
	}

	componentWillUnmount() {
		this.isMounted = false
	}

	componentWillReceiveProps = nextProps => {

		const { register, organizationLogo, organizationColor } = nextProps

		if (nextProps) {
			this.setState({
				styles: organizationColor ? createStyleSheet(organizationColor) : this.state.styles,
				logo: organizationLogo ? {uri: defaultValues.DEFAULT_LOGO_URL + organizationLogo} : this.state.logo
			})
		}

		if (register.isRegistered) {
			if (this.isMounted) {
				this.setState({ showSuccessAlert: true })
				setTimeout(() => {
					// Actions.push('login');
					this.setState({
						showSuccessAlert: false,
						registerRequest: false
					})
				}, 1000)
			} else {
				this.state.showSuccessAlert = true
			}
		}
		if (register.failure) {
			if (this.isMounted) {
				this.setState({ showFailureAlert: true })
				setTimeout(() => {
					this.setState({
						showFailureAlert: false,
						registerRequest: false
					})
				}, 5000)
			} else {
				this.state.showFailureAlert = true
			}
		}
	}
	//
	// handleSubmit = () => {
	//   this.props.onFormSubmit(this.state)
	//     .then(() => Actions.login())
	//     .catch(e => console.log(`Error: ${e}`));
	// }

	goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

	render() {
		// const { loading, error, locale } = this.props;

		// if (loading) return <Loading />;
		const locale = 'en'
		const { register } = this.props
		const {
			nextButtonValidate,
			currentSlide,
			jobType,
			tempCode,
			inviteCode,
			showSuccessAlert,
			showFailureAlert,
			registerRequest,
			errorMessages,
			errorShow,
			styles,
			logo
		} = this.state
		return (
			<Container>
				<Header style={styles.header}>
					<Left style={{ flex: 1 }}>
						<Button transparent onPress={this.goBack}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title style={styles.headerTitle}>
							{translate('Create Account', locale)}
						</Title>
					</Body>
					<Right style={{ flex: 1 }}>
					</Right>
				</Header>
				<Content
					style={[styles.content, this.state.alertVisible && styles.opacity]}
				>
					<View style={currentSlide != 0 ? styles.slideHide : styles.slideShow}>
						<View>
							<H1 style={styles.topTitle}>Tell us about yourself.</H1>
						</View>
						<Spacer size={20} />
						<Body>
							<Item>
								<Input
									style={styles.input}
									placeholder={translate('First Name', locale) + '*'}
									onChangeText={v => this.handleChange('firstName', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[0] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[0]} />
									</Item>
								)}
							<Item>
								<Input
									style={styles.input}
									placeholder={translate('Last Name', locale) + '*'}
									onChangeText={v => this.handleChange('lastName', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[1] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[1]} />
									</Item>
								)}
							<Item>
								<Input
									style={styles.input}
									placeholder={translate('Email', locale) + '*'}
									onChangeText={v => this.handleChange('emailAddress', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[2] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[2]} />
									</Item>
								)}
							<Item>
								<Input
									style={styles.input}
									placeholder={translate('User Name', locale) + '*'}
									onChangeText={v => this.handleChange('userName', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[3] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[3]} />
									</Item>
								)}
							<Item>
								<Input
									style={styles.input}
									secureTextEntry
									placeholder={translate('Password', locale)}
									onChangeText={v => this.handleChange('password', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[4] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[4]} />
									</Item>
								)}
							<Item>
								<Input
									style={styles.input}
									secureTextEntry
									placeholder={translate('Confirm Password', locale)}
									onChangeText={v => this.handleChange('passwordConfirm', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[5] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[5]} />
									</Item>
								)}
							<Item>
								<Input
									placeholder={translate('Phone Number', locale) + '*'}
									onChangeText={v => this.handleChange('phoneNumber', v)}
								/>
							</Item>
							{errorShow &&
								errorMessages[6] && (
									<Item style={{ paddingTop: 10 }}>
										<Messages message={errorMessages[6]} />
									</Item>
								)}
							<Spacer size={20} />
							<Text style={styles.note}>
								*We will provide to others in your community.
							</Text>
							<Spacer size={8} />
							<Button
								full
								style={
									nextButtonValidate ? styles.validateButton : styles.button
								}
								onPress={() => this.handleNext()}
							>
								<Text style={styles.buttonText}>
									{translate('Next', locale)}
								</Text>
							</Button>
						</Body>
					</View>
					<View style={currentSlide != 1 ? styles.slideHide : styles.slideShow}>
						<View>
							<H1 style={styles.topTitle}>{translate('I am a', locale)}...</H1>
						</View>
						{showSuccessAlert && (
							<Messages
								type={'success'}
								message={translate('You are registered successfully', locale)}
							/>
						)}
						{showFailureAlert &&
							register.errorMessage && (
								<Messages message={register.errorMessage} />
							)}
						<Spacer size={10} />
						<Button
							full
							style={jobType == 1 ? styles.validateJobButton : styles.jobButton}
							onPress={() => this.setJobType(1)}
						>
							<Body>
								<Text style={styles.jobButtonText}>
									{translate('COLLEGE STUDENT', locale)}
								</Text>
								<Text style={styles.jobButtonNoteText}>
									{translate('seeking advice, leads & opportunities', locale)}
								</Text>
							</Body>
						</Button>
						<Spacer size={20} />
						<Button
							full
							style={jobType == 2 ? styles.validateJobButton : styles.jobButton}
							onPress={() => this.setJobType(2)}
						>
							<Body>
								<Text style={styles.jobButtonText}>
									{translate('MENTOR', locale)}
								</Text>
								<Text style={styles.jobButtonNoteText}>
									{translate('willing to help college students', locale)}
								</Text>
							</Body>
						</Button>
						<Spacer size={20} />
						<H1 style={styles.topTitle}>
							{translate('I have an invitation code', locale)}:
						</H1>
						<Item>
							<Input
								style={styles.input}
								placeholder={translate('Invite code', locale)}
								onChangeText={v => this.handleChange('inviteCode', v)}
							/>
						</Item>
						{errorShow &&
							errorMessages[7] && (
								<Item style={{ paddingTop: 10 }}>
									<Messages message={errorMessages[7]} />
								</Item>
							)}
						<Button
							full
							style={
								jobType > 0 &&
								// inviteCode === tempCode &&
								inviteCode &&
								!showSuccessAlert &&
								!register.isRegistered
									? styles.validateButton
									: styles.button
							}
							onPress={this.handleSignUp}
						>
							<Text style={styles.buttonText}>
								{translate('Sign Up', locale)}
							</Text>
							{registerRequest &&
								!showSuccessAlert && <Spinner color="white" size="small" />}
						</Button>
					</View>
					<Spacer size={40} />
					<Thumbnail
						square
						style={styles.thumbnail}
						source={logo}
					/>
					<Modal
						visible={this.state.alertVisible}
						transparent={true}
						animationType={'fade'}
						onRequestClose={() => {
							this.showAlert(false)
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
									{translate('Accept Terms', locale)}
								</Text>
								<Text style={styles.alertMessage}>
									{translate(
										'By creating an account, you agree to the',
										locale
									)}{' '}
									&nbsp;
									<Text
										style={styles.alertTerm}
										onPress={() => {
											this.showTerm()
										}}
									>
										{translate('Terms of Service', locale)}
									</Text>
									&nbsp;
									{translate('and', locale)}
									&nbsp;
									<Text
										style={styles.alertTerm}
										onPress={() => {
											this.showPolicy()
										}}
									>
										{translate('Privacy Policy', locale)}
									</Text>.
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
											this.showAlert(false)
										}}
									>
										{translate('Cancel', locale)}
									</Text>
									<View style={styles.alertHorizontalDivider} />
									<Text
										style={styles.buttonStyle}
										onPress={() => {
											this.clickAgree()
										}}
									>
										{translate('I AGREE', locale)}
									</Text>
								</View>
							</View>
						</View>
					</Modal>
				</Content>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	const { register, organization } = state

	return {
		register,
		organizationLogo: organization.logoFilename,
		organizationColor: organization.developerJson
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(registerActions, dispatch),
		autoLoginActions: bindActionCreators(loginFromRegistrationActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen)
