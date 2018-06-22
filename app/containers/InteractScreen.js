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
  Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet, ImageBackground, Alert } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from 'react-native-navbar';
import { NavigationActions } from 'react-navigation';
import { increment, decrement } from '../actions/counterActions';
import { Actions } from 'react-native-router-flux';
import { translate } from '../i18n';
import { logout } from '../actions/loginActions';
import CustomFooter from '../components/CustomFooter';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#053C5C',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: "center",
  },
  viewAlert: {
    backgroundColor: '#358A83',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  viewAlertText: {
    color: '#F9F9F9',
    fontSize: 18,
    alignSelf: 'center',
    paddingBottom: 8,
  },
  wantButtonYes: {
    backgroundColor: '#053C5C',
    alignSelf: 'center',
    marginBottom: 8,
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: {
    color: '#F9F9F9',
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
  },
  buttonTextSmall: {
    color: '#F9F9F9',
    fontSize: 12,
    paddingLeft: 5,
  },
  wantButtonNo: {
    alignSelf: 'center',
    height: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  viewAlertTextSmall: {
    color: '#F9F9F9',
    fontSize: 11,
    alignSelf: 'center',
  },
  dragForm: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  dragFormLeft: {
    width: '25%'
  },
  dragFormBody: {
    width: '75%',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  dragRect: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#358A83',
    width: 60,
    height: 60,
    marginLeft: 28,
    borderRadius: 6,
  },
  dragText: {
    color: '#358A83',
    fontSize: 13,
  },
  dragTextSmall: {
    color: '#8C8C8C',
    fontSize: 11
  },
  contact: {
    borderTopWidth: 1,
    borderColor: '#C8C7CC',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 28,
    paddingRight: 28
  },
  contactHeader: {
    fontSize: 12,
    color: '#053C5C',
    alignSelf: 'center'
  },
  contactButton: {
    width: '100%',
    padding: 0,
    marginBottom: 9,
  },
  contactButtonPlus: {
    width: 40,
    height: 40,
  },
  contactButtonView: {
    borderBottomWidth: 1,
    borderColor: '#C8C7CC',
    height: 40,
    flex: 1,
    marginLeft: 8,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#358A83',
    lineHeight: 35,
  },
  viewMentor: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  mentorPhoto: {
    width: 80,
    height: 80,
  },
  mentorInfo: {
    flex: 1,
    marginLeft: 15,
    height: 80,
  },
  mentorInfoText: {
    color: '#053C5C',
    fontSize: 20,
    paddingBottom: 8,
    lineHeight: 22,
  },
  mentorInfoTextSmall: {
    color: '#A1A1A1',
    fontSize: 16,
  },
  viewMentorList: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 8,
    paddingRight: 8,
    borderTopWidth: 1,
    borderColor: '#C8C7CC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewMentorListItem: {
    flex: 1,
    marginRight: 14,
    width: 60,
    height: 75,
  },
  viewMentorListItemAvatar: {
    width: 60,
    height: 60,
  },
  viewMentorListItemView: {

  },
  viewMentorListItemText: {
    color: '#358A83',
    fontSize: 11,
  },
  viewMentorListPlus: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#358A83',
    borderRadius: 6,
    height: 60,
    width: 60,
    marginBottom: 15,
    padding: 20,
  },
  viewMentorListPlusThumb: {
    width: 20,
    height: 20
  },
});
class InteractScreen extends Component {
  state = {
    activePage: 'interact',
    pageTab: 'setup',
    findMeState: 0
  };
  constructor(props) {
    super(props);
    this.findMeMentor = this.findMeMentor.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderContact = this.renderContact.bind(this);
    this.renderInfoContact = this.renderInfoContact.bind(this);
  }
  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }
  findMeMentor = (locale) => {
    Alert.alert(
      translate('Interact', locale),
      translate('Do you want to be paired with a mentor? YES or NO.', locale),
      [
        {
          text: translate('NO', locale), 
          onPress: () => this.findMeMentorNo(locale),
          style: 'cancel'
        },
        {
          text: translate('YES', locale), 
          onPress: () => this.findMeMentorYes(locale)
        },
      ],
      { cancelable: false }
    )
  }
  findMeMentorYes = (locale) => {
    this.setState({ findMeState: 1 });
    this.refs.toast.show( translate('Check back soon. We will populate this RUM with an opt-in mentor who is willing to help you and then send you a notification.', locale), 500, () => {
      this.setState({ pageTab: 'info' });
    });
  }
  findMeMentorNo = (locale) => {
    this.setState({ findMeState: 2 });
    this.refs.toast.show( translate('We encourage you to do some advice meetings and find someone who will give you advice, leads and opportunities. Good luck!', locale), 500 );
  }
  renderView = (locale) => {
    let { pageTab } = this.state;
    if (pageTab == 'setup')
      return this.renderSetupView(locale);
    else if (pageTab == 'info')
      return this.renderInfoView(locale);
  }
  renderSetupView = (locale) => {
    return (
        <View>
          <View style={styles.viewAlert}>
            <Text style={styles.viewAlertText} >
              { translate('Do you want to be paired with a mentor?', locale) }
            </Text>
            <Button 
              style={styles.wantButtonYes}
              onPress={() => this.findMeMentor(locale)} >
              <Text style={styles.buttonText}>
                { translate('YES!', locale) }
              </Text>
              <Text style={styles.buttonTextSmall}>Find me a mentor.</Text>
            </Button>
            <Button 
              transparent style={styles.wantButtonNo}
              onPress={() => this.findMeMentorNo(locale)} >
              <Text style={styles.viewAlertTextSmall} >
                { translate('NOT NOW', locale) }
              </Text>
            </Button>
          </View>
          <View style={styles.dragForm}>
            <View style={styles.dragFormLeft}>
              <View style={styles.dragRect} />
            </View>
            <View style={styles.dragFormBody}>
              <Text style={styles.dragText}>
                { translate('Drag Your Top 5 Here', locale) }
              </Text>
              <Text style={styles.dragTextSmall}>
                { translate('Your favorites will appear at the top of the screen, so you can access them quickly.', locale) }
              </Text>
            </View>
          </View>
          { this.renderContact(locale) }
        </View>
      )
  }
  renderInfoView = (locale) => {
    return (
      <View >
        <View style={styles.viewMentor}>
          <Thumbnail
            square
            style={styles.mentorPhoto} 
            source={require('../images/avatar1.jpg')} />
          <View style={styles.mentorInfo} >
            <Text style={styles.mentorInfoText}>
              { translate('My Mentor', locale) }
            </Text>
            <Text style={styles.mentorInfoTextSmall}>
              { translate('Subtitle of some sort', locale) }
            </Text>
          </View>
        </View>
        <View style={styles.viewMentorList}>
          {[...Array(3)].map((x, i) => 
            (
              <View style={styles.viewMentorListItem} key={i}>
                <Thumbnail
                  square
                  style={styles.viewMentorListItemAvatar} 
                  source={require('../images/avatar2.jpg')} />
                <View style={styles.viewMentorListItemView} >
                  <Text style={styles.viewMentorListItemText}>
                    { translate('Ron M', locale) }
                  </Text>
                </View>
              </View>
            )
          )}
          <Button transparent style={styles.viewMentorListItem} key={4}>
            <View style={styles.viewMentorListPlus}>
              <Thumbnail
                square
                style={styles.viewMentorListPlusThumb} 
                source={require('../images/plus.png')} />
            </View>
          </Button>
          <Button transparent style={styles.viewMentorListItem} key={5}>
            <View style={styles.viewMentorListPlus}>
              <Thumbnail
                square
                style={styles.viewMentorListPlusThumb} 
                source={require('../images/plus.png')} />
            </View>
          </Button>
        </View>
        { this.renderInfoContact(locale) }
      </View>
      )
  }
  renderContact = (locale) => {
    return (
      <View style={styles.contact}>
        <Text style={styles.contactHeader}>
          { translate('CONTACTS', locale) }
        </Text>
        {[...Array(10)].map((x, i) =>
          (
            <Button 
              transparent 
              style={styles.contactButton} 
              key={i}
              onPress={ () => this.contactNew() } >
              <Thumbnail
                square
                style={styles.contactButtonPlus} 
                source={require('../images/contact_button.jpg')} />
              <View style={styles.contactButtonView} >
                <Text style={styles.contactButtonText}>
                  { translate('Add New RUM', locale) }
                </Text>
              </View>
            </Button>
          )
        )}
      </View>
    )
  }
  renderInfoContact = (locale) => {
    let list = [
      {
        id: 1,
        url: require('../images/contact_avatar1.jpg'),
        name: 'Charley Donovan'
      },
      {
        id: 2,
        url: require('../images/contact_avatar2.jpg'),
        name: 'Selina Keiser'
      },
      {
        id: 3,
        url: require('../images/contact_avatar3.jpg'),
        name: 'Nate Miller'
      },
      {
        id: 4,
        url: require('../images/contact_avatar4.jpg'),
        name: 'Tim Ziebarth'
      },
    ];
    return (
      <View style={styles.contact}>
        <Text style={styles.contactHeader}>
          { translate('CONTACTS', locale) }
        </Text>
        <Button 
          transparent 
          style={styles.contactButton} key={0}
          onPress={ () => this.contactNew() } >
          <Thumbnail
            square
            style={styles.contactButtonPlus} 
            source={require('../images/contact_button.jpg')} />
          <View style={styles.contactButtonView} >
            <Text style={styles.contactButtonText}>
              { translate('Add New RUM', locale) }
            </Text>
          </View>
        </Button>
        {list.map((x, i) =>
          (
            <Button 
              transparent 
              style={styles.contactButton} 
              key={x.id}
              onPress={ () => this.contactNew() } >
              <Thumbnail
                square
                style={styles.contactButtonPlus} 
                source={x.url} />
              <View style={styles.contactButtonView} >
                <Text style={styles.contactButtonText}>
                  {x.name}
                </Text>
              </View>
            </Button>
          )
        )}
      </View>
    )
  }
  contactNew = () => {
    Actions.push('rum');
  }
  render() {
    const locale = 'en';
    const { user } = this.props;
    const { activePage } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.headerTitle}>{translate('Interact', locale)}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={this.props.logout}>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Content>
          { this.renderView(locale) }
        </Content>
        <Toast ref="toast"/>
        <CustomFooter active={activePage} locale={locale}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { counter, user } = state;

  return {
    counter,
    user,
  }
}

const actions = {
  increment,
  decrement,
  logout
}

export default connect(mapStateToProps, actions)(InteractScreen);