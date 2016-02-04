/**
 * @providesModule TappyButtonApp
 * @flow
 */
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity, AppRegistry} = React;

var turn = 0;
var boxPressedX = [];
var boxPressedO = [];
var waysToWin = [["1", "2", "3"],["4", "5", "6"],["7", "8", "9"],["1", "4", "7"],["2", "5", "8"],["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];

var GridSquare = React.createClass({
  getInitialState: function() {
    return { 
      val: "",
    };
  },
  arraysAreEqual: function(array1, array2) {
    if (array1.length == array2.length) {
      for (var i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  checkWinner: function() {
    //check if anyone won
    //if so put an alert and reset the game
    var sortedArray;
    if (turn%2!=0) {
      sortedArray = boxPressedO.sort();
    } else {
      sortedArray = boxPressedX.sort();
    }
    console.log(sortedArray);
    for (var way in waysToWin) {
      console.log(way);
      console.log(waysToWin[way]);
      console.log(waysToWin[way] === sortedArray)
      if (this.arraysAreEqual(waysToWin[way], sortedArray)) {
        return true;
      }
    }
    return false;
  },
  pressBox: function() {
    console.log("Clicked");
    if (this.state.val == "") {
      turn += 1
      if (turn%2==0) {
        this.setState({val: "O"});
        boxPressedX.push(this.props.num);
      } else {
        this.setState({val: "X"});
        boxPressedO.push(this.props.num);
      }
      if (turn >= 5) {
        if (this.checkWinner()) {
          //alert and refresh board
          alert("Someone won");
        }
      }
    }
  },
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.pressBox} style={styles.box}>
          <Text>{this.props.num}</Text>
          <Text>{this.state.val}</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var GridColumn = React.createClass({
  render() {
    return (
      <View>
        <GridSquare num={this.props.id1}></GridSquare>
        <GridSquare num={this.props.id2}></GridSquare>
        <GridSquare num={this.props.id3}></GridSquare>
      </View>
    );
  }
});

var Grid = React.createClass({
  render() {
    return (
      <View style={styles.grid}>
        <GridColumn id1="1" id2="4" id3="7"></GridColumn>
        <GridColumn id1="2" id2="5" id3="8"></GridColumn>
        <GridColumn id1="3" id2="6" id3="9"></GridColumn>
      </View>
    );
  }
});

var Header = React.createClass({
  getInitialState: function() {
    return {
      message: 'X Turn'
    }
  },
  render() {
    return (
      <View>
        <Text style={styles.head}>{this.state.message}</Text>
      </View>
    );
  }
});


var TTT = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Header></Header>
        <Grid></Grid>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop:75,
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    borderColor: 'black',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  },
  head: {
    fontSize: 50,
  }
});

AppRegistry.registerComponent('TTT', function() {
  return TTT;
});