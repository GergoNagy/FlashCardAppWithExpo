import React from 'react';
// import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
// import { DeckSwiper, CardItem, Card } from 'native-base';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

import Style from '../../Style/mainStyle'

export default class CardView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      cards: []
    }

    this.firebaseApp = this.props.screenProps
    this.topic = this.props.navigation.getParam('topic')

    this.itemsRef = this.getRef().child('cards');
  }

  getRef(){
    return this.firebaseApp.database().ref();
  }

  getItems(itemsRef){
    itemsRef.child(this.topic).on('value',(snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          oWord: child.val().oWord,
          tWord: child.val().tWord,
          hint: child.val().hint
        });
      });

      this.setState({cards: items});
      console.log('state: ', this.state.cards)
    });
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  render() {
    return (
        <View style={{height:400}}>
        <DeckSwiper
          dataSource={this.state.cards}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                    <Text>{item.oWord}</Text>
              </CardItem>
              <CardItem>
                    <Text>{item.tWord}</Text>
              </CardItem>
              <CardItem>
                    <Text>{item.hint}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
    );
  }
}
