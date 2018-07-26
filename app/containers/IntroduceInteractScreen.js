import React from 'react'
import PropTypes from 'prop-types'
import {
	Container,
	Content,
	Header,
	Left,
	Right,
	Title,
	Text,
	Item,
	Button,
	Body,
	ListItem,
	View,
	H1,
	H3,
	Spinner
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, ImageBackground, Image } from 'react-native'
import { translate } from '../i18n'
import Loading from './Loading'
import Messages from '../components/Messages'
import Spacer from '../components/Spacer'
import Dimensions from 'Dimensions';
import CustomFooter from '../components/CustomFooter'
import defaultValues from '../constants/defaultValues'
import * as uiColor from '../constants/uiColor'
import * as registerActions from '../actions/registerActions'
import * as onboardingActions from '../actions/onboardingActions'

const {width, height} = Dimensions.get('window');

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
		opacity: {
			opacity: 0.8
		},
		header: {
			backgroundColor: uiColor.getSecondaryColor(organizationColor)
		},
		headerTitle: {
			color: '#FFF',
			fontSize: 18,
			alignSelf: 'center'
		},
		headerSkipButton : {
			paddingLeft: 0,
			paddingBottom: 0
		},
		headerSkip: {
			fontSize: 14,
			color: 'rgba(255, 255, 255, 0.65)',
			paddingLeft: 0,
			paddingBottom: 0
		},
		content: {
			padding: 44,
			height: (height - 88),
		},
		header3: {
			color: '#5C5C5C',
			fontSize: 20,
			fontWeight: '600',
			textAlign: 'left'
		},
		description: {
			color: '#5C5C5C',
			fontSize: 18,
			textAlign: 'left'
		},
		button: {
			backgroundColor: '#7E888D'
		},
		validateButton: {
			backgroundColor: uiColor.getPrimaryColor(organizationColor)
		},
		slideShow: {
			display: 'flex'
		},
	})
}

class IntroduceInteractScreen extends React.Component {

	static defaultProps = {
		error: null
	}

	constructor(props) {
		super(props)
		this.state = {
			currentSlide: 0,
			styles: createStyleSheet(props.organizationColor)
		}
	}

	componentWillMount() {
    this.props.onboardingActions.checkedOnboardingInteract()
  }

	componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

	handleNext = () => {
		Actions.push('interact')
	}

	handleSkip = () => {
		Actions.push('home')
	}

	componentDidMount = () => {

	}

	render() {
		const locale = 'en'
		const {
			nextButtonValidate,
			currentSlide,
			styles
		} = this.state

		return (
			<Container>
				<Header style={styles.header}>
					<Left style={{ flex: 1 }} />
					<Body style={{ flex: 3 }}>
						<Title style={styles.headerTitle}>
							{translate('Interact', locale)}
						</Title>
					</Body>
					<Right style={{ flex: 1 }}>
						<Button transparent
								style={styles.headerSkipButton}
							 onPress={this.handleSkip}>
							<Text style={styles.headerSkip}>{translate('Skip', locale)}</Text>
						</Button>
					</Right>
				</Header>
				<Content style={styles.content}>
					<View style={styles.slideShow}>
						<Spacer size={72} />
						<View>
							<H1 style={styles.header3}>{translate('Interact', locale)}</H1>
						</View>
						<Spacer size={19} />
						<Text style={styles.description}>
							1. A place to keep track of and intentionally manage your meaningful relationships.
						</Text>
						<Spacer size={19} />
						<Text style={styles.description}>
							2. A portal to request additional coaching and communicate with your mentor(s)
						</Text>
						<Spacer size={153} />
						<Button
							full
							style={styles.validateButton}
							onPress={this.handleNext}
						>
							<Text style={styles.buttonText}>
								{translate('Next', locale)}
							</Text>
						</Button>
					</View>
				</Content>
				<CustomFooter locale={locale} />
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
		actions: bindActionCreators(registerActions, dispatch),
		onboardingActions: bindActionCreators(onboardingActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IntroduceInteractScreen)
