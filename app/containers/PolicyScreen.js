import React from 'react';
import PropTypes from 'prop-types';
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
  Body
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Modal } from 'react-native'
import Loading from './Loading';
import Messages from '../components/Messages';
import CustomHeader from '../components/Header';
import Spacer from '../components/Spacer';

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
  })
}

class PolicyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: createStyleSheet(props.organizationColor)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    const { loading, error } = this.props;
    const { styles } = this.state;
    // Loading
    // if (loading) return <Loading />;

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
        <Content padder>
          <CustomHeader
            title="Privacy and Policy"
            content="Privacy and Policy Content"
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { organization } = state

  return {
    organizationColor: organization.developerJson
  }
}

export default connect(
  mapStateToProps
)(PolicyScreen);
