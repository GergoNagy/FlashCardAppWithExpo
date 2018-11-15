import React from 'react';
import * as firebase from 'firebase'
import ApiKeys from './ApiKeys'

import Home from './components/home'
import Create from './components/create'
import Play from './components/playScreens/play'
import LevelSelect from './components/playScreens/levelSelect'
import Edit from './components/edit'
import Setting from './components/setting' 

import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator({
  Home: Home,
  Create: Create,
  Play: Play,
  LevelSelect: LevelSelect,
  Edit: Edit,
  Setting: Setting
})

export default class App extends React.Component {
  constructor(){
    super()

    this.state = {

    }
    
    this.firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig);

    // if (!firebase.app.length) {firebase.initializeApp(ApiKeys.firebaseConfig)}
  }

  render() {
    return (
      <RootStack screenProps = { this.firebaseApp } />
    );
  }
}