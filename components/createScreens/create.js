import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';

import * as firebase from 'firebase';

import Style from '../../Style/mainStyle.js'


export default class Create extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      oWord: '',
      tWord: '',
      hint: ''
    }

    this.topic = this.props.navigation.getParam('topic')

    // this.topic = 'Fruits'

    this.firebaseApp = this.props.screenProps
    this.itemsRef = this.getRef().child('cards').child( this.topic );
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
              onChangeText={(oWord) => this.setState({ oWord })}
              placeholder='Origin Word'
            />
            </Item>
            <Item>
            <Input
              onChangeText={(tWord) => this.setState({ tWord })}
              placeholder='Translation'
            />
            </Item>
            <Item>
            <Input
              onChangeText={(hint) => this.setState({ hint })}
              placeholder='Hint'
            />
            </Item>
            <Item>
            <Button onPress={() => {this.itemsRef.push( this.state )}} >
              <Icon name='add' />
            </Button>
          </Item>
        </Content>
       </Container>
    );
  }
}
