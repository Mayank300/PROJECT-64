import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import dicitionary from '../DataBase'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
      word:'',
      definition:'',
      lexicalCategory:'',
    };
  }

  getWord = (text) => {
     text = text.toLowerCase();
    try{
      var word = dicitionary[text]["word"]
      var definition = dicitionary[text]["definition"]
      var lexicalCategory = dicitionary[text]["lexicalCategory"]
      this.setState = ({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" :definition
      })
    }
    catch(err){
      alert("THIS WORD IS NOT AVAILABLE FOR NOW")
      this.setState =({
        'text' : '',
        'isSearchPressed' : false
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading...',
              lexicalCategory: 'Loading...',
              examples: [],
              definition: 'Loading...',
            });
          }}
          value={this.state.text}
        />

        <Text style={styles.displayText}>{this.state.displayText}</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          console.log(this.state.text)
            
          }}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Word: {'  '}</Text>
          <Text style={{ fontSize: 18 }}>{this.state.word}</Text>

          <View>
            <Text style={styles.detailsTitle}>Type: {'  '}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.lexicalCategory}</Text>
          </View>

          <View>
            {/*  style={{ flexDirection: 'row' ,flexWrap: 'wrap'}}> */}
            <Text style={styles.detailsTitle}>Definition: {'  '}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#35BAf6',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 10,
    width: 700,
    height: 600,
  },
  inputBox: {
    marginTop: 50,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  searchButton: {
    backgroundColor: '#ffffff',
    width: 160,
    height: 40,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  detailsTitle: {
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
    height: 411,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    backgroundColor: '#ffffff',
  },
});
