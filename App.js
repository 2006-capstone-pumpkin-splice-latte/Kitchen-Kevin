import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-community/voice'

export default function App() {
  const [recognizedVoice, setRecognized] = useState('')
  const [startedVoice, setStarted] = useState('')
  const [results, setResults] = useState([])
  const [transcript, setTranscript] = useState([])
  console.log('running refresh?')
  let timeout

  Voice.onSpeechStart = (e) => {
    console.log('started')
    setStarted('started')
  }
  Voice.onSpeechRecognized = (e) => {
    console.log('recognized')
    setRecognized('recognized')
  }
  Voice.onSpeechResults = (e) => {
    clearTimeout(timeout)
    setResults([...results, ...e.value])
    timeout = setTimeout(()=> {
      Voice.stop()}, 2500)
  }

  Voice.onSpeechEnd = (e) => {
    console.log('speech ended')
  }

  const startRecognition = async(e) => {
    e.preventDefault()
    setRecognized('')
    setStarted('')
    try {
      console.log('running')
      await Voice.start('en-US')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello, I am Kitchen Kevin</Text>
      <Text>
        Conversation Text Log
      </Text>
      {results.map((sentence, idx) => {
        return(
          <Text key={idx}>
            {sentence}
          </Text>
        )
      })}
      <Button onPress={startRecognition} title="Talk To Kevin!">
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
