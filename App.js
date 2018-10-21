import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './components/home'
import Create from './components/create'

import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator({
  Home: Home,
  Create: Create,
})

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
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
