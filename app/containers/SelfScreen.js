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
    rumPhotoArea: {
      width: '100%'
    },
    rumBackground: {
      width: '100%',
      height: '100%',
    },
    rumPhoto: {
      width: 80,
      height: 80,
      marginTop: 11,
      alignSelf: 'center',
    },
    userInfoName: {
      color: uiColor.getSecondaryColor(organizationColor),
      fontSize: 17,
      // alignSelf: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
      lineHeight: 19,
    },
    userInfoDate: {
      color: '#A1A1A1',
      fontSize: 11,
      // alignSelf: 'center',
      justifyContent: 'flex-start',
    },
    userInfoContact: {
      height: 20,
      // alignSelf: 'center',
      justifyContent: 'flex-start',
      paddingTop: 0,
      paddingBottom: 0,
    },
    userInfoContactText: {
      color: uiColor.getSecondaryColor(organizationColor),
      fontSize: 11,
      paddingLeft: 0,
      paddingRight: 0
    },
    userInfoDetailsButton: {
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
    promptButtonEach: {
      width: 60,
      height: 60,
      marginLeft: 17,
      marginRight: 17,
      flex: 1
    },
    contactButtonEach: {
      width: 30,
      height: 30,
      marginLeft: 17,
      marginRight: 17,
      flex: 1
    },
    promptButtonImage: {
      width: 60,
      height: 60,
      alignSelf: 'center'
    },
    promptName: {
      color: '#7E888D',
      fontSize: 12,
      paddingLeft: 10,
      paddingTop: 13,
      height: 30,
      alignSelf: 'center'
    },
    contactButtonImage: {
      width: 30,
      height: 30,
    },
    rumTabArea: {

    },
    promptRow: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    promptColView: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 10,
      height: 120
    },
    profileStatus: {
      color: uiColor.getSecondaryColor(organizationColor),
      fontSize: 16,
      alignSelf: 'center',
      paddingTop: 39,
      paddingBottom: 27,
      maxWidth: 240,
    },
    profileButton: {
      backgroundColor: uiColor.getSecondaryColor(organizationColor),
      height: 32,
      paddingTop:  3,
      paddingBottom: 3,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 10,
      alignSelf: 'center',
    },
    profileButtonText: {
      color: '#F9F9F9',
      fontSize: 14,
      paddingRight: 0,
    },
    profileButtonTextSmall: {
      color: '#F9F9F9',
      fontSize: 12,
      paddingLeft: 5,
    },
    profileHelpButton: {
      alignSelf: 'center',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      maxWidth: 222,
    },
    profileHelpButtonText: {
      color: uiColor.getSecondaryColor(organizationColor),
      fontSize: 13,
      textAlign: 'center',
      width: 222,
    },
    profileHelpButtonTextSmall: {
      color: uiColor.getSecondaryColor(organizationColor),
      fontSize: 11,
      textAlign: 'center',
      width: 222,
    },
    recentActivityTitleRow: {
      height: 30,
      width: '100%',
    },
    recentActivityTitleText: {
      color: '#7E888D',
      fontSize: 12,
      paddingLeft: 10,
      paddingTop: 13,
      height: 30,
    },
    recentActivityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingTop: 10,
      paddingLeft: 11,
      paddingRight: 11,
      paddingBottom: 10,
    },
    recentActivityRowView: {
      padding: 10,
      height: 40,
    },
    recentActivityRowImage: {
      flex: 1,
      width: 20,
      height: 20,
    },
    recentActivityRowInfo: {
      flex: 5,
      paddingLeft: 15,
    },
    recentActivityRowInfoDate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    recentActivityRowInfoDateWeekDay: {
      fontSize: 7,
      color: uiColor.getPrimaryColor(organizationColor),
      paddingRight: 0,
    },
    recentActivityRowInfoDateDetail: {
      fontSize: 6,
      color: '#7E888D',
      paddingLeft: 5,
    },
    recentActivityRowInfoWay: {
      fontSize: 10,
      color: '#000000',
    },
    recentActivityRowInfoMessage: {
      fontSize: 8,
      color: '#8C8C8C',
    },
    addNewNote: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
    },
    addNewNoteButton: {
      padding: 13,
      width: 200,
      height: 39,
    },
    addNewNoteButtonText: {
      width: 174,
      textAlign: 'center',
      fontSize: 11,
      color: uiColor.getSecondaryColor(organizationColor),
    },
    noteList: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomWidth: 1,
      borderColor: '#C8C7CC',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    noteListLeftView: {
      flex: 4,
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 10,
      paddingRight: 10,
    },
    noteListLeftViewText: {
      color: '#8C8C8C',
      fontSize: 10,
    },
    noteListButtons: {
      alignItems: 'center',
      paddingTop: 2,
      paddingBottom: 2,
    },
    noteListButton: {
      width: 16,
      height: 16,
      marginBottom: 12,
    },
    noteListButtonBottom: {
      width: 16,
      height: 16,
    },
    noteListButtonImage: {
      width: 16,
      height: 16,
    },
    addNewTask: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
    },
    addNewTaskButton: {
      padding: 13,
      width: 200,
      height: 39,
    },
    addNewTaskButtonText: {
      width: 174,
      textAlign: 'center',
      fontSize: 11,
      color: uiColor.getSecondaryColor(organizationColor),
    },
    taskList: {
      paddingTop: 0,
      paddingBottom: 13,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    taskListLeftView: {
      flex: 1,
    },
    taskTickImage: {
      width: 20,
      height: 20,
    },
    taskListCenterView: {
      flex: 4,
    },
    taskListCenterViewName: {
      color: '#000000',
      fontSize: 10,
    },
    taskListCenterViewText: {
      color: '#8C8C8C',
      fontSize: 8,
    },
    taskListButtons: {
      flex: 1,
    },
    taskListButton: {
      width: 16,
      height: 16,
      alignSelf: 'flex-end',
    },
    taskListButtonImage: {
      width: 16,
      height: 16,
    },
    slideDown: {
      marginLeft: 25,
      justifyContent: 'center',
    },
    slideDownButton: {
      paddingTop: 0,
      paddingBottom: 0,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: '#C8C7CC',
      height: 42,
    },
    slideDownButtonText: {
      top: 8,
      paddingLeft: 0,
      fontSize: 12,
      color: uiColor.getSecondaryColor(organizationColor),
    },
    slideDownButtonIcon: {
      color: '#8C8C8C',
      fontSize: 13,
      top: -6,
      alignSelf: 'flex-end',
    },
    slideDownView: {
      marginTop: 32,
      width: '100%',
      alignSelf: 'center',
    },
    birkmanMap: {
      marginTop: 10,
      width: 250,
      height: 250,
    }
  });
}

class SelfScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activePage: 'self',
      profileIndex: 0,
      styles: createStyleSheet(props.organizationColor)
    };
    this.renderTabPrompt = this.renderTabPrompt.bind(this);
    this.renderTabTasks = this.renderTabTasks.bind(this);
    this.renderTabObjects = this.renderTabObjects.bind(this);
    this.renderTabHistory = this.renderTabHistory.bind(this);
  }

  componentDidMount = () => {
    const { register, auth } = this.props
		if (register.isRegistered && auth.fromRegistration && !auth.checkedOnboarding.self){
      Actions.push('introduceSelf')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organizationColor) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  contactChat = () => {
    console.log('chat');
  }

  contactInfo = () => {
    this.details()
  }

  details = () => {
    Actions.push('editProfile');
  }

  handleLogout = () => {
    this.props.loginActions.logoutRequest(
      this.props.auth.access_token, this.props.auth.token_type
    )
  }

  renderView = (locale) => {
    const { user, organizationColor } = this.props
    const { styles } = this.state
    const userInfo = user.userInfo
    return (
      <View>
        <View style={styles.rumPhotoArea}>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                   circle
                   style={styles.rumPhoto}
                   source={require('../images/rum_profile_photo.png')} />
                </Left>
                <Body>
                  <Text style={styles.userInfoName}>
                   {userInfo && `${userInfo.Person.FirstName} ${userInfo.Person.LastName}`}
                  </Text>
                  <Text note numberOfLines={1}>
                    {userInfo && `${translate('Member since', locale)} ${new Date(userInfo.Person.DateCreated).toLocaleDateString()}`}
                  </Text>
                  <Button
                    transparent
                    style={styles.userInfoContact}
                    onPress={() => this.contactInfo()}>
                    <Text style={styles.userInfoContactText}>
                      { translate('Contact Info', locale) }
                    </Text>
                  </Button>
                </Body>
               <Right>
                 <Button transparent
                  style={styles.userInfoDetailsButton}
                  onPress={() => this.details()}>
                   <Text>{ translate('Details', locale) }</Text>
                 </Button>
               </Right>
             </ListItem>
           </List>
        </View>
        <Tabs
          style={styles.rumTabArea}
          initialPage={0}
          tabContainerStyle={{ height: 30, borderBottomWidth: 0, shadowRadius: 0, shadowOpacity: 0 }}
          tabBarUnderlineStyle={{ borderBottomWidth:1, borderColor: uiColor.getSecondaryColor(organizationColor) }} >
          <Tab
            tabStyle={{backgroundColor: 'white', height: 30, borderBottomWidth:1, borderColor: '#C8C7CC'}}
            textStyle={{color: '#7E888D', fontSize: 12}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{ color: uiColor.getSecondaryColor(organizationColor), fontWeight: 'normal', fontSize: 12 }}
            heading={ translate('PROMPTS', locale) } >
            { this.renderTabPrompt(locale) }
          </Tab>
          <Tab
            tabStyle={{backgroundColor: 'white', height: 30, borderBottomWidth:1, borderColor: '#C8C7CC'}}
            textStyle={{color: '#7E888D', fontSize: 12}}
            activeTabStyle={{backgroundColor: 'white', borderBottomWidth: 2, borderColor: uiColor.getSecondaryColor(organizationColor)}}
            activeTextStyle={{color: uiColor.getSecondaryColor(organizationColor), fontWeight: 'normal', fontSize: 12}}
            heading={ translate('TASKS', locale) }>
            { this.renderTabTasks(locale) }
          </Tab>
          <Tab
            tabStyle={{backgroundColor: 'white', height: 30, borderBottomWidth:1, borderColor: '#C8C7CC'}}
            textStyle={{color: '#7E888D', fontSize: 12}}
            activeTabStyle={{backgroundColor: 'white', borderBottomWidth: 2, borderColor: uiColor.getSecondaryColor(organizationColor)}}
            activeTextStyle={{color: uiColor.getSecondaryColor(organizationColor), fontWeight: 'normal', fontSize: 12}}
            heading={ translate('SCHEDULE', locale) }>
            { this.renderTabObjects(locale) }
          </Tab>
          <Tab
            tabStyle={{backgroundColor: 'white', height: 30, borderBottomWidth:1, borderColor: '#C8C7CC'}}
            textStyle={{color: '#7E888D', fontSize: 12}}
            activeTabStyle={{backgroundColor: 'white', borderBottomWidth: 2, borderColor: uiColor.getSecondaryColor(organizationColor)}}
            activeTextStyle={{color: uiColor.getSecondaryColor(organizationColor), fontWeight: 'normal', fontSize: 12}}
            heading={ translate('OBJECTS', locale) }>
            { this.renderTabObjects(locale) }
          </Tab>
          <Tab
            tabStyle={{backgroundColor: 'white', height: 30, borderBottomWidth:1, borderColor: '#C8C7CC'}}
            textStyle={{color: '#7E888D', fontSize: 12}}
            activeTabStyle={{backgroundColor: 'white', borderBottomWidth: 2, borderColor: uiColor.getSecondaryColor(organizationColor)}}
            activeTextStyle={{color: uiColor.getSecondaryColor(organizationColor), fontWeight: 'normal', fontSize: 12}}
            heading={ translate('HISTORY', locale) }>
            { this.renderTabHistory(locale) }
          </Tab>
        </Tabs>
      </View>
    )
  }

  requestChangeProfileIndex = (id) => {
    this.setState({ profileIndex: id });
  }

  renderTabPrompt = (locale) => {
    let { profileIndex, styles } = this.state;
    return (
      <Grid>
        <Row style={styles.promptRow}>
          <Col>
            <View style={styles.promptColView}>
              <Thumbnail
                circle
                style={styles.promptButtonImage}
                source={require('../images/WhoTheyKnow.png')} />
              <Text style={styles.promptName}>
                { translate('Who I Know', locale) }
              </Text>
            </View>
          </Col>
          <Col>
            <View style={styles.promptColView}>
              <Thumbnail
                circle
                style={styles.promptButtonImage}
                source={require('../images/WhatTheyKnow.png')} />
              <Text style={styles.promptName}>
                { translate('What I Know', locale) }
              </Text>
            </View>
          </Col>
        </Row>
        <Row style={styles.promptRow}>
          <Col>
            <View style={styles.promptColView}>
              <Thumbnail
                circle
                style={styles.promptButtonImage}
                source={require('../images/TheirInterests.png')} />
              <Text style={styles.promptName}>
                { translate('What I Like', locale) }
              </Text>
            </View>
          </Col>
          <Col>
            <View style={styles.promptColView}>
              <Thumbnail
                square
                style={styles.promptButtonImage}
                source={require('../images/TheirMotivations.png')} />
              <Text style={styles.promptName}>
                { translate('What I Love', locale) }
              </Text>
            </View>
          </Col>
        </Row>
      </Grid>
    )
  }

  renderTabTasks = (locale) => {
    let tasks = [
      {
        id: 1,
        tick: 0,
        name: 'Email RUM to review resume.',
        text: 'Ask for feedback on your recently updated resume.',
      },
      {
        id: 2,
        tick: 1,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 3,
        tick: 1,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 4,
        tick: 1,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 5,
        tick: 0,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 6,
        tick: 0,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 7,
        tick: 0,
        name: 'Task Name',
        text: 'Task detail',
      },
      {
        id: 8,
        tick: 0,
        name: 'Task Name',
        text: 'Task detail',
      },
    ]
    let ticks = [
      require('../images/tick.png'),
      require('../images/tick_disabled.png'),
    ]
    const { styles } = this.state

    return (
      <Grid>
        <Row style={styles.addNewTask} size={0}>
          <Button
            transparent
            style={styles.addNewTaskButton} >
            <Text style={styles.addNewTaskButtonText}>
              { translate('+ Add NEW TASK', locale) }
            </Text>
          </Button>
        </Row>
        {tasks.map((x, i) =>
          (
            <Row style={styles.taskList} size={0} key={x.id}>
              <View style={styles.taskListLeftView}>
                <Thumbnail
                    square
                    style={styles.taskTickImage}
                    source={ticks[ x.tick ]} />
              </View>
              <View style={styles.taskListCenterView}>
                <Text style={styles.taskListCenterViewName}>
                  {x.name}
                </Text>
                <Text style={styles.taskListCenterViewText}>
                  {x.text}
                </Text>
              </View>
              <View style={styles.taskListButtons}>
                <Button
                  transparent
                  style={styles.taskListButton}>
                  <Thumbnail
                    square
                    style={styles.taskListButtonImage}
                    source={require('../images/remove.png')} />
                </Button>
              </View>
            </Row>
          )
        )}
      </Grid>
    )
  }

  renderTabObjects = (locale) => {
    let notes = [
      {
        id: 1,
        text: 'Here is a note about this RUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet nisi nec dolor feugiat condimentum. Vestibulum cursus, odio sit amet molestie pharetra, dui est hendrerit quam, non iaculis urna leo id arcu. Duis nibh sapien, feugiat eu ullamcorper vel, dignissim ornare risus.',
      },
      {
        id: 2,
        text: 'Here is a shorter note about this RUM.'
      },
      {
        id: 3,
        text: 'Here is a note about this RUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet nisi nec dolor feugiat condimentum. Vestibulum cursus, odio sit amet molestie pharetra, dui est hendrerit quam, non iaculis urna leo id arcu. Duis nibh sapien, feugiat eu ullamcorper vel, dignissim ornare risus.'
      },
      {
        id: 4,
        text: 'Here is a note about this RUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet nisi nec dolor feugiat condimentum. Vestibulum cursus, odio sit amet molestie pharetra, dui est hendrerit quam, non iaculis urna leo id arcu. Duis nibh sapien, feugiat eu ullamcorper vel, dignissim ornare risus.'
      },
    ]
    const { styles } = this.state

    return (
      <Grid>
        <Row style={styles.addNewNote} size={0}>
          <Button
            transparent
            style={styles.addNewNoteButton} >
            <Text style={styles.addNewNoteButtonText}>{ translate('+ Add NEW Note', locale) }</Text>
          </Button>
        </Row>
        {notes.map((x, i) =>
          (
            <Row style={styles.noteList} size={0} key={x.id}>
              <View style={styles.noteListLeftView}>
                <Text style={styles.noteListLeftViewText}>
                  {x.text}
                </Text>
              </View>
              <View style={styles.noteListButtons}>
                <Button
                  transparent
                  style={styles.noteListButton}>
                  <Thumbnail
                    square
                    style={styles.noteListButtonImage}
                    source={require('../images/edit.png')} />
                </Button>
                <Button
                  transparent
                  style={styles.noteListButtonBottom}>
                  <Thumbnail
                    square
                    style={styles.noteListButtonImage}
                    source={require('../images/remove.png')} />
                </Button>
              </View>
            </Row>
          )
        )}
      </Grid>
    )
  }

  renderTabHistory = (locale) => {
    const { styles } = this.state

    return (
      <Grid>
        <Row style={styles.recentActivityTitleRow} size={0}>
          <Text style={styles.recentActivityTitleText}>
            {translate('Most Recent Activity', locale)}
          </Text>
        </Row>
        <Row style={styles.recentActivityRow} size={0}>
          <View style={styles.recentActivityRowView}>
            <Thumbnail
              square
              style={styles.recentActivityRowImage}
              source={require('../images/envelop.png')} />
          </View>
          <View style={styles.recentActivityRowInfo} >
            <View style={styles.recentActivityRowInfoDate}>
              <Text style={styles.recentActivityRowInfoDateWeekDay}>
                { translate('TUES', locale) }
              </Text>
              <Text style={styles.recentActivityRowInfoDateDetail}>
                { translate('June', locale) } 6, 2018
              </Text>
            </View>
            <Text style={styles.recentActivityRowInfoWay}>
              { translate('Email', locale) }
            </Text>
            <Text style={styles.recentActivityRowInfoMessage}>
              RE: Have you started interviewing for open positions?
            </Text>
          </View>
        </Row>
        <Row style={styles.recentActivityRow} size={0}>
          <View style={styles.recentActivityRowView}>
            <Thumbnail
              square
              style={styles.recentActivityRowImage}
              source={require('../images/tick.png')} />
          </View>
          <View style={styles.recentActivityRowInfo} >
            <View style={styles.recentActivityRowInfoDate}>
              <Text style={styles.recentActivityRowInfoDateWeekDay}>
                { translate('TUES', locale) }
              </Text>
              <Text style={styles.recentActivityRowInfoDateDetail}>
                { translate('June', locale) } 6, 2018
              </Text>
            </View>
            <Text style={styles.recentActivityRowInfoWay}>
              { translate('Task', locale) }
            </Text>
            <Text style={styles.recentActivityRowInfoMessage}>
              Detail of task here
            </Text>
          </View>
        </Row>
        <Row style={styles.recentActivityRow} size={0}>
          <View style={styles.recentActivityRowView}>
            <Thumbnail
              square
              style={styles.recentActivityRowImage}
              source={require('../images/phone.png')} />
          </View>
          <View style={styles.recentActivityRowInfo} >
            <View style={styles.recentActivityRowInfoDate}>
              <Text style={styles.recentActivityRowInfoDateWeekDay}>
                { translate('TUES', locale) }
              </Text>
              <Text style={styles.recentActivityRowInfoDateDetail}>
                { translate('June', locale) } 6, 2018
              </Text>
            </View>
            <Text style={styles.recentActivityRowInfoWay}>
              { translate('Phone Call', locale) }
            </Text>
            <Text style={styles.recentActivityRowInfoMessage}>
              { translate('Duration', locale) } 00:12:45
            </Text>
          </View>
        </Row>
        <Row style={styles.recentActivityRow} size={0}>
          <View style={styles.recentActivityRowView}>
            <Thumbnail
              square
              style={styles.recentActivityRowImage}
              source={require('../images/envelop.png')} />
          </View>
          <View style={styles.recentActivityRowInfo} >
            <View style={styles.recentActivityRowInfoDate}>
              <Text style={styles.recentActivityRowInfoDateWeekDay}>
                { translate('TUES', locale) }
              </Text>
              <Text style={styles.recentActivityRowInfoDateDetail}>
                { translate('June', locale) } 6, 2018
              </Text>
            </View>
            <Text style={styles.recentActivityRowInfoWay}>
              { translate('Action', locale) }
            </Text>
            <Text style={styles.recentActivityRowInfoMessage}>
              { translate('Detail', locale) } 00:12:45
            </Text>
          </View>
        </Row>
        <Row style={styles.recentActivityRow} size={0}>
          <View style={styles.recentActivityRowView}>
            <Thumbnail
              square
              style={styles.recentActivityRowImage}
              source={require('../images/envelop.png')} />
          </View>
          <View style={styles.recentActivityRowInfo} >
            <View style={styles.recentActivityRowInfoDate}>
              <Text style={styles.recentActivityRowInfoDateWeekDay}>
                { translate('TUES', locale) }
              </Text>
              <Text style={styles.recentActivityRowInfoDateDetail}>
                { translate('June', locale) } 6, 2018
              </Text>
            </View>
            <Text style={styles.recentActivityRowInfoWay}>
              { translate('Action', locale) }
            </Text>
            <Text style={styles.recentActivityRowInfoMessage}>
              { translate('Detail', locale) } 00:12:45
            </Text>
          </View>
        </Row>
      </Grid>
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
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.headerTitle}>{translate('Self', locale)}</Title>
          </Body>
          <Right style={{ flex: 2 }}>
            <Button transparent onPress={this.handleLogout}>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: '#FFF' }}>
          { this.renderView(locale) }
        </Content>
        <Toast ref="toast"/>
        <CustomFooter active={activePage} locale={locale}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { auth, user, register, organization } = state;

  return {
    auth,
    user,
    register,
    organizationColor: organization.developerJson
  }
}

function mapDispatchToProps(dispatch) {
  return {
		loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfScreen);
