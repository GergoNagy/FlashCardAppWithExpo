import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Input, Container, Content, Item, Button, Icon, List, ListItem } from 'native-base';

import Style from '../../Style/mainStyle'

export default class TopicSelector extends React.Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            itemDataSource: ds
        }

        this.firebaseApp = this.props.screenProps

        this.itemsRef = this.getRef().child('cards');

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    getRef() {
        return this.firebaseApp.database().ref();
    }

    getItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            let items = [];

            snap.forEach((child) => {
                items.push({
                    topic: child.key
                });
            });
            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(items)
            });
        });
    }

    pressRow(item) {
        this.props.navigation.navigate('Create', { topic: item.topic })
    }

    createTopic() {
        console.log("new topci")
    }

    renderRow(item) {
        return (
            <View>
                <TouchableHighlight
                    onPress={() => {
                        this.createTopic();
                    }}>
                    <Text>Add New Topic</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => {
                    this.pressRow(item);
                }} >
                    <View style={Style.li}>
                        <Text style={Style.liText}> {item.topic} </Text>
                    </View>
                </TouchableHighlight>

            </View>
        )
    }

    componentWillMount() {
        this.getItems(this.itemsRef);
    }

    componentDidMount() {
        this.getItems(this.itemsRef);
    }

    render() {
        return (
            <Container style={Style.container}>
                <Content>
                    <ListView
                        dataSource={this.state.itemDataSource}
                        renderRow={this.renderRow}
                    />
                </Content>
            </Container>
        );
    }
}
