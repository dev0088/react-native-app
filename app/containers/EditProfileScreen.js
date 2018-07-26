import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Button,
  Text,
  Item,
  Input,
  H1,
  Title,
  Icon,
  View,
  Badge,
  Thumbnail,
  Tab,
  Tabs,
  Grid,
  Row,
  Col,
  List,
  ListItem
} from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet, ImageBackground, Alert } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from 'react-native-navbar';
import { NavigationActions } from 'react-navigation';
import {bindActionCreators} from 'redux';
import { increment, decrement } from '../actions/counterActions';
import { Actions } from 'react-native-router-flux';
import { translate } from '../i18n';
import * as loginActions from '../actions/loginActions';
import * as userActions from '../actions/userActions';
import Spacer from '../components/Spacer';
import Messages from '../components/Messages';
import CustomFooter from '../components/CustomFooter';
import * as uiColor from '../constants/uiColor';

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
    header: {
      backgroundColor: uiColor.getSecondaryColor(organizationColor),
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 18,
      alignSelf: "center",
    },
    backText: {
      top: -1,
      fontSize: 17,
      color: '#F9F9F9',
    },
    userSummaryView: {
      backgroundColor: uiColor.getPrimaryColor(organizationColor),
      paddingLeft: 5,
      paddingRight: 5,
      width: '100%'
    },
    userSummaryTextArea: {

    },
    userSummaryText: {
      color: '#F9F9F9',
      justifyContent: 'flex-start',
      // marginTop: 10,
      lineHeight: 19,
    },
    userPhotoThumbArea: {
      width: '100%'
    },
    rumBackground: {
      width: '100%',
      height: '100%',
    },
    userPhotoThumb: {
      width: 60,
      height: 60,
      // marginTop: 11,
      alignSelf: 'center',
    },
    userInfoName: {
      color: '#FFFFFF',
      fontSize: 17,
      justifyContent: 'flex-start',
      // marginTop: 10,
      lineHeight: 19,
    },
    userInfoDate: {
      color: '#FFFFFF',
      fontSize: 11,
      justifyContent: 'flex-start',
    },
    userInfoContact: {
      height: 20,
      justifyContent: 'flex-start',
      paddingTop: 0,
      paddingBottom: 0,
    },
    userInfoContactText: {
      color: '#FFFFFF',
      justifyContent: 'flex-start',
      fontSize: 11,
    },
    userInfoDetailsButton: {
      color: '#FFFFFF',
      paddingLeft: 0,
    },
    contactButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
      width: 192,
      alignSelf: 'center',
      marginTop: 14,
    },
    userInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingTop: 3,
      paddingLeft: 11,
      paddingRight: 11,
      paddingBottom: 3,
    },
    userInfoFieldsView: {
      paddingLeft: 5,
      paddingRight: 5,
      width: '100%'
    },
    userInfoFieldItem: {
      // height: 50,
      // flex: 1, flexDirection: 'row',
      padding: 10,
      height: 40,
    },
    userInfoFieldTitle: {
      // height: 30,
      fontSize: 13,
      color: '#808080',
      flex: 1,
      width: 80,
      height: 40,
    },
    userInfoFieldInput: {
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 13,
      borderWidth: 1,
      borderColor: uiColor.getPrimaryColor(organizationColor)
    },
    userInfoFieldTitleView: {
      padding: 10,
      height: 40,
    },
    userInfoValueView: {
      flex: 5,
      paddingLeft: 15,
      height: 30
    }

  })
}

class EditProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activePage: 'self',

			nextButtonValidate: false,
			errorMessage: '',
			errorShow: false,
      person: this.getProfileFromProps(props),
      styles: createStyleSheet(props.organizationColor),
      showSuccessAlert: false,
      showFailureAlert: false,
      saveRequest: false,
    };

    // Object.assign(this.state, this.getProfileFromProps(props))

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    if (this.props.user.userInfo.Person) {
      this.setState({
        person: this.getProfileFromProps(this.props)
      })
    }
  }

  getProfileFromProps(props) {
    if (props.user) {
      const { userInfo } = props.user
      // return userInfo.Person ? userInfo.Person : {}
      if (userInfo && userInfo.Person) {
        return {
          AllowNotifications: userInfo.AllowNotifications,
          Email: userInfo.Person.Email,
          GoalThree: userInfo.Person.GoalThree,
          ValueFour: userInfo.Person.ValueFour,
          Industry: userInfo.Person.Industry,
          LastName: userInfo.Person.LastName,
          Chapter: userInfo.Person.Chapter,
          PreferredName: userInfo.Person.PreferredName,
          LinkedInUrl: userInfo.Person.LinkedInUrl,
          GoalThreeDate: userInfo.Person.GoalThreeDate,
          ProcessingLeads: userInfo.ProcessingLeads,
          School: userInfo.Person.School,
          ValueThree: userInfo.Person.ValueThree,
          Company: userInfo.Person.Company,
          MissionStatement: userInfo.Person.MissionStatement,
          State: userInfo.Person.State,
          Club: userInfo.Person.Club,
          AcceptedTerms: userInfo.AcceptedTerms,
          CollegeMajor: userInfo.Person.CollegeMajor,
          JobTitle: userInfo.Person.JobTitle,
          ValueTwo: userInfo.Person.ValueTwo,
          GoalOneDate: userInfo.Person.GoalOneDate,
          GoalOne: userInfo.Person.GoalOne,
          CareerLocation: userInfo.Person.CareerLocation,
          FirstName: userInfo.Person.FirstName,
          Phone: userInfo.Person.Phone,
          ValueOne: userInfo.Person.ValueOne,
          City: userInfo.Person.City,
          Country: userInfo.Person.Country,
          Strengths: userInfo.Person.Strengths,
          GoalTwo: userInfo.Person.GoalTwo,
          UserID: userInfo.UserID,
          GoalTwoDate: userInfo.Person.GoalTwoDate,
          Objective: userInfo.Person.Objective,
          ValueFive: userInfo.Person.ValueFive
        }
      }
    }

    return {}
  }

  componentWillUnmount() {
		this.isMounted = false
	}

  componentDidMount() {
    this.isMounted = true
  }


  componentWillReceiveProps(nextProps) {
    let { organizationColor, user } = nextProps
    // Set color
    if (organizationColor) {
      this.setState({
        styles: createStyleSheet(organizationColor)
      })
    }
    // Set user info
    if (user.userInfo.Person && user.isGotUserInfo) {
      this.setState({
        person: this.getProfileFromProps(nextProps)
      })
    }
    // Set status from response
    let __this = this;
    if (user.isGotUserInfo) {
      if (this.isMounted) {
        this.setState({
          showSuccessAlert: true,
          showFailureAlert: false
         })
        setTimeout(() => {
          __this.setState({
            showSuccessAlert: false,
            saveRequest: false,
          })
        }, 3000)
      } else {
        this.state.showSuccessAlert = true
      }
    } else if (user.failure) {
      if (this.isMounted) {
        this.setState({
          showSuccessAlert: false,
          showFailureAlert: true,
          errorMessage: user.errorMessage
        })
        setTimeout(() => {
          __this.setState({
            showFailureAlert: false,
            saveRequest: false
          })
        }, 5000)
      } else {
        this.state.showFailureAlert = true
      }
    }
  }

  handleChange = (name, val) => {
    let person = this.state.person
    person[name] = val
		this.setState(
			{
				...this.state,
        person: person
				// person: {
        //   ...this.person,
        //   [name]: val
        // }
			},
			// () => {
			// 	this.checkValidataion()
			// }
		)
	}

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  contactChat = () => {
    console.log('chat');
  }

  contactInfo = () => {
    Actions.push('contact');
  }

  filterPersonData() {
    const {person} = this.state
    return {
      FirstName: person.FirstName,
      PreferredName: person.PreferredName,
      lastName: person.LastName,
      jobTitle: person.JobTitle,
      company: person.Company,
      city: person.City,
      state: person.State,
      postalCode: person.PostalCode,
      country: person.Country,
      industry: person.Industry,
      email: person.Email,
      phone: person.Phone,
      linkedInUrl: person.LinkedInUrl,
      facebook: person.Facebook,
      twitter: person.Twitter,
      school: person.School,
      club: person.Club,
      objective: person.Objective,
      chapter: person.Chapter,
      rollNumber: person.RollNumber,
      valueOne: person.ValueOne,
      valueTwo: person.ValueTwo,
      valueThree: person.ValueThree,
      valueFour: person.ValueFour,
      valueFive: person.ValueFive,
      missionStatement: person.MissionStatement,
      strengths: person.Strengths,
      goalOne: person.GoalOne,
      goalOneDate: person.GoalOneDate,
      goalOne: person.GoalOne,
      goalOneDate: person.GoalOneDate,
      goalTwo: person.GoalTwo,
      goalTwoDate: person.GoalTwoDate,
      goalThree: person.GoalThree,
      goalThreeDate: person.GoalThreeDate,
    }
  }
  handleSave = () => {
    this.setState({
      showSuccessAlert: false,
      saveRequest: false
    })
    this.props.userActions.userUpdateRequest(
      this.props.auth.access_token,
      this.props.auth.token_type,
      this.state.person
    )
  }

  renderSummary = (locale) => {
    const { user, organizationColor } = this.props
    const { styles } = this.state
    const userInfo = user.userInfo
    return (
      <View>
        <View style={styles.userSummaryView}>
          <List style={{paddingTop: 0}}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                   circle
                   style={styles.userPhotoThumb}
                   source={require('../images/rum_profile_photo.png')} />
                </Left>
                <Body>
                  <Text style={styles.userSummaryText}>
                   {userInfo && `${userInfo.Person.FirstName} ${userInfo.Person.LastName}`}
                  </Text>
                  <Text style={styles.userInfoContactText}>
                    {userInfo && `${translate('Member since', locale)} ${new Date(userInfo.Person.DateCreated).toLocaleDateString()}`}
                  </Text>
                </Body>
             </ListItem>
           </List>
        </View>
      </View>
    )
  }

  renderDetailsInfo = () => {
    const {
      errorShow,
      errorMessage,
      person,
      styles,
      showSuccessAlert,
      showFailureAlert,
      saveRequest
    } = this.state

    const locale = 'en'

    return (
      <View style={styles.userInfoFieldsView}>
        {showSuccessAlert && (
          <Item style={{ paddingTop: 10 }}>
            <Messages
              type={'success'}
              message={translate('Your profile was saved successfully', locale)}
            />
          </Item>
        )}
        {showFailureAlert &&
          (errorMessage ? (
            <Item style={{ paddingTop: 10 }}>
              <Messages message={errorMessage} />
            </Item>
          ):(
            <Item style={{ paddingTop: 10 }}>
              <Messages
                type={'info'}
                message={translate('Nothing changed', locale)}
              />
            </Item>
          ))
        }

          <Grid>
            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                <Text style={styles.userInfoFieldTitle}>
                  {translate('First Name', locale)}
                </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  placeholder={translate('First Name', locale)}
                  value={person.FirstName}
                  onChangeText={v => this.handleChange('FirstName', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Preferred Name', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.PreferredName}
                  onChangeText={v => this.handleChange('PreferredName', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Last Name', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.LastName}
                  onChangeText={v => this.handleChange('LastName', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Job Title', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.JobTitle}
                  onChangeText={v => this.handleChange('JobTitle', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Company', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Company}
                  onChangeText={v => this.handleChange('Company', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('City', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.City}
                  onChangeText={v => this.handleChange('City', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('State', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.State}
                  onChangeText={v => this.handleChange('State', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Postal Code', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.PostalCode}
                  onChangeText={v => this.handleChange('PostalCode', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Country', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Country}
                  onChangeText={v => this.handleChange('Country', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Industry', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Industry}
                  onChangeText={v => this.handleChange('Industry', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Email', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Email}
                  onChangeText={v => this.handleChange('Email', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Phone', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Phone}
                  onChangeText={v => this.handleChange('Phone', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('LinkedInUrl', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.LinkedInUrl}
                  onChangeText={v => this.handleChange('LinkedInUrl', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Facebook', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Facebook}
                  onChangeText={v => this.handleChange('Facebook', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Twitter', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Twitter}
                  onChangeText={v => this.handleChange('Twitter', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('School', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.School}
                  onChangeText={v => this.handleChange('School', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Club', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Club}
                  onChangeText={v => this.handleChange('Club', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Objective', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Objective}
                  onChangeText={v => this.handleChange('Objective', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Chapter', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Chapter}
                  onChangeText={v => this.handleChange('Chapter', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('ValueOne', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.ValueOne}
                  onChangeText={v => this.handleChange('ValueOne', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('ValueTwo', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.ValueTwo}
                  onChangeText={v => this.handleChange('ValueTwo', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('ValueThree', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.ValueThree}
                  onChangeText={v => this.handleChange('ValueThree', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('ValueFour', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.valueFour}
                  onChangeText={v => this.handleChange('ValueFour', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('ValueFive', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.valueFive}
                  onChangeText={v => this.handleChange('ValueFive', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Mission Statement', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.MissionStatement}
                  onChangeText={v => this.handleChange('MissionStatement', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Strengths', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.Strengths}
                  onChangeText={v => this.handleChange('Strengths', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Goal 1', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalOne}
                  onChangeText={v => this.handleChange('GoalOne', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {''}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalOneDate}
                  placeholder={'mm/dd/yyyy'}
                  onChangeText={v => this.handleChange('GoalOneDate', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Goal 2', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalTwo}
                  onChangeText={v => this.handleChange('GoalTwo', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {''}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalTwoDate}
                  placeholder={'mm/dd/yyyy'}
                  onChangeText={v => this.handleChange('GoalTwoDate', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {translate('Goal 3', locale)}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalThree}
                  onChangeText={v => this.handleChange('GoalThree', v)}
                />
              </View>
            </Row>

            <Row style={styles.userInfoRow} size={0}>
              <View style={styles.userInfoFieldTitleView}>
                  <Text style={styles.userInfoFieldTitle}>
                    {''}
                  </Text>
              </View>
              <View style={styles.userInfoValueView} >
                <Input
                  style={styles.userInfoFieldInput}
                  value={person.GoalThreeDate}
                  placeholder={'mm/dd/yyyy'}
                  onChangeText={v => this.handleChange('GoalThreeDate', v)}
                />
              </View>
            </Row>

          </Grid>
        </View>

    )
  }

  render() {
    const locale = 'en';
    const { auth } = this.props;
    const { activePage, styles } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 2 }}>
            <Button transparent onPress={this.goBack}>
              <Text style={styles.backText}>{translate('Cancel', locale)}</Text>
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.headerTitle}>{translate('Edit Profile', locale)}</Title>
          </Body>
          <Right style={{ flex: 2 }}>
            <Button transparent onPress={this.handleSave}>
              <Text style={styles.backText}>{translate('Save', locale)}</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: '#FFF' }}>
          { this.renderSummary(locale) }
          { this.renderDetailsInfo()}
        </Content>
        <Toast ref="toast"/>
        <CustomFooter active={activePage} locale={locale}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { auth, user, organization } = state;

  return {
    auth,
    user,
    organizationColor: organization.developerJson
  }
}

function mapDispatchToProps(dispatch) {
  return {
		loginActions: bindActionCreators(loginActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
