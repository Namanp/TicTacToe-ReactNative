/**
 * @providesModule TappyButtonApp
 * @flow
 */
'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity, AppRegistry} = React;

var turn          = 0;
var boxPressedX   = [];
var boxPressedO   = [];
var gameOver      = false;

var GridSquare = React.createClass({
  getInitialState: function() {
    return { 
      val: "",
    };
  },

  // GAME FUNCTIONS ------------------------------------------------------ 
  // ---------------------------------------------------------------------

  checkWinner: function(boxPressed) {
    return this.rowsWon(boxPressed) || this.columnsWon(boxPressed) || this.diagonalsWon(boxPressed);
  },

  pressBox: function() {
    console.log("Clicked");
    if (this.state.val == "") {
      turn += 1;
      var boxPressed;
      var potentialWinner;

      var num = parseInt(this.props.num);
      if (turn%2 == 0) {
        this.setState({val: "O"});
        boxPressedO.push(num);
        boxPressed = boxPressedO;
        potentialWinner = "O"
      } else {
        this.setState({val: "X"});
        boxPressedX.push(num);
        boxPressed = boxPressedX;
        potentialWinner = "X";
      }
      
      if (turn >= 5) {
        if (this.checkWinner(boxPressed)) {
          //alert and refresh board
          alert(potentialWinner + "'s won!");
          return;
        }

        if (turn == 9) {
          alert("Game Over.");
        }
      }
    }
  },

  // HELPER FUNCTIONS ----------------------------------------------------
  // ---------------------------------------------------------------------

   rowsWon: function(boxPressed) {
    for (var i = 1; i <= 7; i = i + 3) {

      var won = boxPressed.includes(i) && boxPressed.includes(i+1) && boxPressed.includes(i+2);
      
      if (won) {
        return true;
      }
    }
    return false;
  },

  columnsWon: function(boxPressed) {
    for (var i = 1; i <= 3; i++) {
      var won = boxPressed.includes(i) && boxPressed.includes(i+3) && boxPressed.includes(i+6);
      if (won) {
        return true;
      }
    }
    return false;
  },

  diagonalsWon: function(boxPressed) {
    for (var diagonal = 1; diagonal <= 2; diagonal++) {
      var startBox;
      var increment;
      if (diagonal == 1) {
        startBox = 1;
        increment = 4;
      } else {
        startBox = 3;
        increment = 2;
      }
      var won = boxPressed.includes(startBox) && boxPressed.includes(startBox + increment) && boxPressed.includes(startBox + 2 * increment);

      if (won) {
        return true;
      }

    }
    return false;
  },



  
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.pressBox} style={styles.box}>
          
          <Text style={styles.boxValue}>{this.state.val}</Text>
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
    backgroundColor: '#3F51B5'
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    borderColor: 'black',
    backgroundColor: '#C5CAE9',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  },
  head: {
    fontSize: 50,
    color: 'white'
  }, 
  boxValue: {
    justifyContent: 'center',
    fontSize: 70,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white'
  }
});

AppRegistry.registerComponent('TTT', function() {
  return TTT;
});