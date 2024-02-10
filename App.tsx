import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TextInput, Button, View } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Config from 'react-native-config';

const App = () => {

  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const API_KEY = Config.API_KEY;

  async function fetchData() {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const results = await model.generateContent(inputText);
      console.log("RESULTS: ", results);
      const response = results.response;
      console.log("RESPONSE: ", response);
      const text = response.text();
      console.log("TEXT: \n", text);
      setResponse(text);
    }
    catch (error) {
      setResponse("ERROR, try again");
      console.log("ERROR: ", error);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Hello, React Native!</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text"
          value={inputText}
          onChangeText={setInputText}
        />

        <Button title="Search" onPress={fetchData} />

        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{response}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderColor: 'gray',
    borderRadius: 5,
  },
  inputDisplay: {
    fontSize: 16,
    marginTop: 20,
  },
  outputContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  outputText: {
    fontSize: 16,
  },
});

export default App;