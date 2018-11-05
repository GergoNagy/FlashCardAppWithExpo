import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';

import Style from '../Style/mainStyle'

export default class Create extends React.Component {
  render() {
    return (
      <Container style={Style.container}>
        <Content>
          <Item>
            <Input
              onChangeText={(newContent) => this.setState({ newContent })}
              placeholder='Origin Word'
            />
            <Button onPress={() => this.addRow(this.state.newContent)} >
              <Icon name='add' />
            </Button>
          </Item>
        </Content>
       </Container>
    );
  }
}
