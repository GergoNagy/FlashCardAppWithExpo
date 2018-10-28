import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

export default class Edit extends React.Component {
  render() {

    const username = this.props.navigation.getParam('username', 'no user name')

    return (
      <View style={styles.container}>
        <Text>Edit</Text>
        <Text>{username}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
