import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definations[0];
          console.log(responseObject.definations[0]);
          var defination = wordData.description;
          var lexicalCategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            defination: defination,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            word: 'PLEASE ENTER THE CORRECT SPELLING :(',
            lexicalCategory: 'NOT FOUND :(',
            defination: 'NOT FOUND :(',
          });
        }
      });
  };

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
              lexicalCategory: '',
              examples: [],
              defination: '',
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
            <Text style={styles.detailsTitle}>Defination: {'  '}</Text>
            <Text style={{ fontSize: 18 }}>{this.state.defination}</Text>
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
