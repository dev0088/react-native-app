import React from 'react'
import PropTypes from 'prop-types'
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
	ListItem,
	Thumbnail,
	View,
	H1,
	H3,
	Spinner
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as registerActions from '../actions/registerActions'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, ImageBackground, Image } from 'react-native'
import { translate } from '../i18n'
import Loading from './Loading'
import Messages from '../components/Messages'
import Spacer from '../components/Spacer'
import Dimensions from 'Dimensions';
import Logo from '../images/logo_white.png'
import defaultValues from '../constants/defaultValues'
import * as uiColor from '../constants/uiColor'

const {width, height} = Dimensions.get('window');

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
		opacity: {
			opacity: 0.8
		},
		content: {
			padding: 44,
			height: (height - 88),
		},
		headerWelcome: {
			color: '#FFF',
			fontSize: 32,
			textAlign: 'left'
		},
		headerTitle: {
			color: '#FFF',
			fontSize: 44,
			lineHeight: 48,
			fontWeight: '600',
			textAlign: 'left'
		},
		header3: {
			color: '#FFF',
			fontSize: 18,
			fontWeight: '600',
			textAlign: 'left'
		},
		description: {
			color: '#BBB',
			fontSize: 16,
			textAlign: 'left'
		},
		header: {
			color: uiColor.getSecondaryColor(organizationColor),
			fontSize: 16,
			textAlign: 'left'
		},
		button: {
			backgroundColor: '#7E888D'
		},
		validateButton: {
			backgroundColor: uiColor.getPrimaryColor(organizationColor)
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
		slideShow: {
			display: 'flex'
		},
		slideHide: {
			display: 'none'
		},
		imageBackground: {
			width: '100%',
			height: height,
		},
	})
}

const TermsAlertView = (
	<Text>
		By creating an account, you agree to the
		<Text>Privacy of Service</Text> and
		<Text>Privacy Policy</Text>.
	</Text>
)

class WelcomToPursuitScreen extends React.Component {

	static defaultProps = {
		error: null
	}

	constructor(props) {
		super(props)
		this.state = {
			currentSlide: 0,
			styles: createStyleSheet(props.organizationColor)
		}

		this.handleNext = this.handleNext.bind(this)

	}

	handleNext = () => {
		Actions.push('home')
	}

	componentWillReceiveProps(nextProps) {
    if (nextProps.organizationColor) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

	componentDidMount = () => {

	}

	render() {
		// const { loading, error, locale } = this.props;

		// if (loading) return <Loading />;
		const locale = 'en'
		const {
			nextButtonValidate,
			currentSlide,
			styles
		} = this.state

		return (
			<Container>
				<ImageBackground
					style={styles.imageBackground}
					source={require('../images/background.png')} >
					<Content style={styles.content}>
						<View style={currentSlide != 0 ? styles.slideHide : styles.slideShow}>
							<Spacer size={20} />
							<View>
								<Image
									style={{alignItems: 'flex-start', width: 50, height: 51}}
									source={require('../images/logo_at_omega.png')}
							  />
							</View>
							<Spacer size={50} />
							<View>
								<H1 style={styles.headerWelcome}>Welcome to</H1>
							</View>
							<Spacer size={8} />
							<View>
								<H1 style={styles.headerTitle}>Pursuit</H1>
							</View>
							<Spacer size={47} />
							<View>
								<H1 style={styles.header3}>What are your after?</H1>
							</View>
							<Spacer size={19} />
							<Text style={styles.description}>
								Professional opportunities, mentors, insight, a better understanding of yourself?
							</Text>
							<Spacer size={19} />
							<Text style={styles.description}>
								At some point or another you will want help with all of the above.
							</Text>
							<Spacer size={19} />
							<Text style={styles.header3}>
								Pursuit is the tool.
							</Text>
							<Spacer size={66} />
							<Button
								full
								style={styles.validateButton}
								onPress={() => this.handleNext()}
							>
								<Text style={styles.buttonText}>
									{translate('Next', locale)}
								</Text>
							</Button>
						</View>
					</Content>
				</ImageBackground>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	const { register, organization } = state

	return {
		register,
		organizationColor: organization.developerJson
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(registerActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomToPursuitScreen)
