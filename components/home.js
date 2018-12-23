import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View styles={styles.container}>
        <Text>Flash Cards</Text>
        <Button 
          styles={styles.mainButtuns}
          title='Create'
          onPress={
            () => this.props.navigation.navigate('CreateSelect')
          }
        />
        <Button 
          title='Play'
          onPress={
            () => this.props.navigation.navigate('Play')
          }
        />
        <Button 
          title='Edit / Delete'
          onPress={
            () => this.props.navigation.navigate('Edit')
          }
        />
        <Button 
          title='Setting'
          onPress={
            () => this.props.navigation.navigate('Setting', { username: 'Jack'})
          }
        />
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
  mainButtuns:{
    //create rounded button style
    //put in the center
    //bugger space between buttons
  },
});
