import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button 
          title='Create'
          onPress={
            () => this.props.navigation.navigate('Create', { username: 'Jack'})
          }
        />
        <Button 
          title='Play'
          onPress={
            () => this.props.navigation.navigate('Create', { username: 'Jack'})
          }
        />
        <Button 
          title='Edit / Delete'
          onPress={
            () => this.props.navigation.navigate('Create', { username: 'Jack'})
          }
        />
        <Button 
          title='Setting'
          onPress={
            () => this.props.navigation.navigate('Create', { username: 'Jack'})
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
});
