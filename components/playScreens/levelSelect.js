import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';

import Style from '../../Style/mainStyle'

export default class Play extends React.Component {
  constructor(props){
    super(props);
 
    let ds = new ListView.DataSource({ rowHasChanged:(r1, r2) => r1 !== r2 });

    this.state = {
      itemDataSource: ds
    }

    this.firebaseApp = this.props.screenProps
    this.language = this.props.navigation.getParam('language')

    this.itemsRef = this.getRef().child('cards');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef(){
    return this.firebaseApp.database().ref();
  }

  getItems(itemsRef){
    itemsRef.child(this.language).on('value',(snap) => {
      let items = [];
        console.log('items value: ', snap)
      snap.forEach((child) => {
        items.push({
          oWord: child.val().oWord,
          tWord: child.val().tWord,
          hint: child.val().hint
        });
      });

      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    console.log(item)
    //open the next page with the card under English 
  }

  renderRow(item){
    return(
      <TouchableHighlight onPress={() => {
        this.pressRow(item);
      }} >
      <View style={Style.li}>
         <Text style={Style.liText}> { item.oWord } </Text>
         <Text style={Style.liText}> { item.tWord } </Text>
         <Text style={Style.liText}> { item.hint } </Text>
      </View>
      </TouchableHighlight>
    )
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  render() {
    return (
      <Container style={Style.container}>
        <Content>
            <Text>Select difficulty</Text>
          <ListView
            dataSource={this.state.itemDataSource}
            renderRow={this.renderRow}
          />
        </Content>
       </Container>
    );
  }
}
