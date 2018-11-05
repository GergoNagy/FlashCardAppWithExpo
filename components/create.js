import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';
import ApiKeys from '../ApiKeys';

import Style from '../Style/mainStyle'

const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig);

export default class Create extends React.Component {
  constructor(props){
    super(props);
 
    let ds = new ListView.DataSource({ rowHasChanged:(r1, r2) => r1 !== r2 });

    this.state = {
      itemDataSource: ds
    }

    this.itemsRef = this.getRef().child('items');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap) => {
      let items = [];

      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });

    });
  }

  pressRow(item){
    console.log(item)
  }

  renderRow(item){
    return(
      <TouchableHighlight onPress={() => {
        this.pressRow(item);
      }} >
      <View style={Style.li}>
         <Text style={Style.liText}> { item.title } </Text>
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

  addRow(data){

    var key = firebase.database().ref('/contacts').push().key
    firebase.database().ref('/contacts').child(key).set({ name: data })
  }

  render() {
    return (
      <Container style={Style.container}>
        <Content>
          {/* <Item>
            <Input
              onChangeText={(newContent) => this.setState({ newContent })}
              placeholder='Origin Word'
            />
            <Button onPress={() => this.addRow(this.state.newContent)} >
              <Icon name='add' />
            </Button>
          </Item> */}
          <ListView
            dataSource={this.state.itemDataSource}
            renderRow={this.renderRow}
          />
        </Content>
       </Container>
    );
  }
}
