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
  Form,
  Label,
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
    rumPhotoArea: {
      width: '100%',
      height: 145,
    },
    rumBackground: {
      width: '100%',
      height: '100%',
    },
    rumPhoto: {
      width: 60,
      height: 60,
      marginTop: 11,
      alignSelf: 'center',
    },
    rumInfoName: {
      color: '#335f7a',
      fontSize: 17,
      alignSelf: 'center',
      marginTop: 10,
      lineHeight: 19,
    },
    rumInfoDate: {
      color: '#7E888D',
      fontSize: 8,
      alignSelf: 'center',
    },
    rumInfoEdit: {
      alignSelf: 'center',
      marginTop: 8,
      height: 20,
      paddingTop: 0,
      paddingBottom: 0,
    },
    rumInfoEditText: {
      color: uiColor.getPrimaryColor(organizationColor),
      fontSize: 12,
    },
    formLabel: {
      // fontSize: 10,
    },
    formInput: {
      // fontSize: 12,
    },
  });
}

class ContactInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 'interact',
      styles: createStyleSheet(props.organizationColor)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  editProfile = () => {
    console.log('Edit Profile');
  }

	handleLogout = () => {
		this.props.loginActions.logoutRequest(
			this.props.auth.access_token, this.props.auth.token_type
		)
	}
  renderView = (locale) => {
    const { styles } = this.state

    return (
      <View>
        <View style={styles.rumPhotoArea}>
          <ImageBackground
            style={styles.rumBackground}
            source={require('../images/rum_profile_background.png')} >
            <Thumbnail
              square
              style={styles.rumPhoto}
              source={require('../images/rum_profile_photo.png')} />
            <View style={styles.rumInfo} >
              <Text style={styles.rumInfoName}>
                First Last
              </Text>
              <Text style={styles.rumInfoDate}>
                Member since 06/06/2018
              </Text>
              <Button
                transparent
                style={styles.rumInfoEdit}
                onPress={() => this.editProfile()}>
                <Text style={styles.rumInfoEditText}>
                  { translate('Edit', locale) }
                </Text>
              </Button>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.rumForm}>
          <Form>
            <Item floatingLabel>
              <Label textStyle={styles.formLabel}>{ translate('First Name', locale) }</Label>
              <Input style={styles.formInput} value={ "First" }/>
            </Item>
            <Item floatingLabel>
              <Label>{ translate('Preferred Name', locale) }</Label>
              <Input value={ "Preferred" }/>
            </Item>
            <Item floatingLabel>
              <Label>{ translate('Last Name', locale) }</Label>
              <Input value={ "Last" }/>
            </Item>
            <Item floatingLabel>
              <Label>{ translate('Phone Number', locale) }</Label>
              <Input value={ "(xxx) xxx-xxxx" } />
            </Item>
            <Item floatingLabel>
              <Label>{ translate('Email', locale) }</Label>
              <Input value={ "firstlast@company.com" }/>
            </Item>
          </Form>
        </View>
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
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.headerTitle}>{translate('Contact Info', locale)}</Title>
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
  const { counter, auth, organization } = state;

  return {
    counter,
    auth,
    organizationColor: organization.developerJson
  }
}

function mapDispatchToProps(dispatch) {
  return {
		loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoScreen);
