import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-community/voice'

export default function App() {
  const [recognizedVoice, setRecognized] = useState('')
  const [startedVoice, setStarted] = useState('')
  const [results, setResults] = useState([])
  const [transcript, setTranscript] = useState([])

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
    setResults(e.value)
    timeout = setTimeout(()=> {
      setTranscript([...transcript, ...results])
      Voice.stop()}, 3000)
  }

  Voice.onSpeechEnd = (e) => {
    console.log('speech ended')
  }

  const stopRecognition = async() => {
    try {
      console.log('running stop recognition')
      await Voice.stop()
    } catch (error) {
      console.error(error)
    }
  }
  const startRecognition = async(e) => {
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
