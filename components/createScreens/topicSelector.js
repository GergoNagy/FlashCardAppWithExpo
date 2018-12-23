import React from 'react';
import { Button, Text, View, ListView, TouchableHighlight } from 'react-native';
import Dialog, { DialogButton, DialogTitle, SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { Container, Content } from 'native-base';

import Style from '../../Style/mainStyle'

export default class TopicSelector extends React.Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            itemDataSource: ds,
            visible: false
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

    renderRow(item) {
        return (
            <View>
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
                <Button
                    title="Add New Topic"
                    onPress={() => {
                        this.setState({ visible: true });
                    }}
                />
                <View>
                    <Dialog
                        visible={this.state.visible}
                        dialogTitle={<DialogTitle title="Creat a new Topic" />}
                        actions={[
                            <DialogButton
                                text="Create"
                                onPress={() => { console.log("create new title") } }
                            />,
                        ]}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>
                            <Text>Hello</Text>
                        </DialogContent>
                    </Dialog>
                </View>
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
