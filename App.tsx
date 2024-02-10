import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TextInput, Button, View } from 'react-native';
import Config from 'react-native-config';

const App = () => {

  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  //const BACKEND_URL = Config.BACKEND_URL;

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3007/google/generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let textContent = '';
      if (data && data.response && data.response.candidates && data.response.candidates.length > 0 &&
        data.response.candidates[0].content && data.response.candidates[0].content.parts &&
        data.response.candidates[0].content.parts.length > 0 && data.response.candidates[0].content.parts[0].text) {

        textContent = data.response.candidates[0].content.parts[0].text;
        setResponse(textContent);

      } else {
        console.error("Invalid or missing text content in response", data);
      }
    } catch (error) {
      console.error("ERROR: ", error);
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