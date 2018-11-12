import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';

import * as firebase from 'firebase';

import Style from '../Style/mainStyle'


export default class Create extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: ''
    }

    this.firebaseApp = this.props.screenProps

    this.itemsRef = this.getRef().child('items');
  }

  getRef(){
    return this.firebaseApp.database().ref();
  }

  render() {
    return (
      <Container style={Style.container}>
        <Content>
          <Item>
            <Input
              onChangeText={(name) => this.setState({ name })}
              placeholder='Origin Word'
            />
            <Button onPress={() => {this.itemsRef.push({title: this.state.name})}} >
              <Icon name='add' />
            </Button>
          </Item>
        </Content>
       </Container>
    );
  }
}
