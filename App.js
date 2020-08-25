import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Voice from "@react-native-community/voice";
import Tts from "react-native-tts";

import { Dialogflow_V2 } from "react-native-dialogflow";
import dfConfig from "./apis/config/dialogflowConfig";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Dialogflow_V2.setConfiguration(
      dfConfig.client_email,
      dfConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dfConfig.project_id
    );
    this.state = {
      recognized: "",
      started: false,
      results: [],
    };
  }

  initiateConversation() {
    Dialogflow_V2.startListening(
      (result) => {
        console.log(result.queryResult.parameters.foodIngredients);
        this.setState({
          results: [
            ...this.state.results,
            `You: ${result.queryResult.queryText}`,
            `Kevin: ${result.queryResult.fulfillmentText}. You currently have ${result.queryResult.parameters.foodIngredients}`,
          ],
        });
        Tts.speak(
          `${result.queryResult.fulfillmentText}. You currently have ${result.queryResult.parameters.foodIngredients}`,
          {
            iosVoiceId: "com.apple.ttsbundle.Daniel-compact",
            rate: 0.5,
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, I am Kitchen Kevin</Text>
        <Text>Conversation Text Log</Text>
        {this.state.results.map((result, idx) => (
          <Text key={idx}> {result}</Text>
        ))}
        <Button
          title="Talk To Kevin"
          onPress={() => {
            this.initiateConversation();
          }}
        />
        <Button
          title="Stop Talking to Kevin"
          onPress={() => {
            Dialogflow_V2.finishListening();
          }}
        />
        {/* <Button title="tts-speak" onPress={this.handleTtsPress} /> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
});

// {"allRequiredParamsPresent": true, "fulfillmentMessages": [{"text": [Object]}], "fulfillmentText": "Let me pull up a recipe for those ingredients", "intent": {"displayName": "give-ingredients", "name": "projects/fullstack-capstone-286920/agent/intents/cc685737-9902-4c06-8600-be60f7f9bffa"}, "intentDetectionConfidence": 0.66938186, "languageCode": "en", "parameters": {"food-ingredients": ["potatoes", "tomato", "red wine"]}, "queryText": "Ingredients I have are potatoes tomatoes red wine"}
