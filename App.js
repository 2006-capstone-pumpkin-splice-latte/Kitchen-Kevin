import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-community/voice'

import { Dialogflow_V2 } from 'react-native-dialogflow'
import dfConfig from './apis/config/dialogflowConfig'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    Dialogflow_V2.setConfiguration(
      dfConfig.client_email,
      dfConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dfConfig.project_id
    )
    this.state = {
      recognized: '',
      started: false,
      results: []
    }
  }

  initiateConversation() {
    Dialogflow_V2.startListening(result=>{
      console.log(result)

      this.setState({
        results: [...this.state.results, "You: " + result.queryResult.queryText, "Kevin: " + result.queryResult.fulfillmentText]
      })
    },
    error=>{
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, I am Kitchen Kevin</Text>
        <Text>
          Conversation Text Log
        </Text>
        {this.state.results.map((result, idx) => <Text key={idx}> {result}</Text>
        )}
        <Button title="Talk To Kevin" onPress={() => {
          this.initiateConversation()
        }}/>
        <Button title="Stop Talking to Kevin" onPress={()=> {
          Dialogflow_V2.finishListening()
        }}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
