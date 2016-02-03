/**
 * @providesModule TappyButtonApp
 * @flow
 */
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity, AppRegistry} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.clickMe.bind(this)}>
          <View style={styles.box}>
            <Text>Hello {this.props.name}. Please click me.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  }
});

class TTT extends React.Component {
  render() {
    return <HelloThere name="Component" />;
  }
};

AppRegistry.registerComponent('TTT', function() {
  return TTT;
});