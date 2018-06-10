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
  Title
} from 'native-base';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/counterActions';
import { Actions } from 'react-native-router-flux';
import { logout } from '../actions/loginActions';
import NavigationBar from 'react-native-navbar';

class HomeScreen extends Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Header>
          <Right>
            <Button transparent onPress={this.props.logout}>
              <Text>Log Out</Text>
            </Button>
          </Right>
        </Header>
        <Content paddr>
          <Body style={{padding: 20}}>
            <H1 block>{`Welcome ${user.userName}`}</H1>
          </Body>
        </Content>
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

export default connect(mapStateToProps, actions)(HomeScreen);