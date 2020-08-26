import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import spoonacularAPI from './apis/spoon';

import { Dialogflow_V2 } from 'react-native-dialogflow';
import dfConfig from './apis/config/dialogflowConfig';

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
			results        : [],
			ingredientsArr : [],
      ingredientsStr : '',
      recipeSteps: [],
      stepCount: 0,
      recipeCounter: 0,
      recipeTitle: '',
      ttsConfig: {
        iosVoiceId : 'com.apple.ttsbundle.Daniel-compact',
				rate       : 0.5
      }
		};
	}

	initiateConversation() {
		Dialogflow_V2.startListening(
			async (result) => {
        console.log(result.queryResult)
        let intent = result.queryResult.intent.displayName
        let response = result.queryResult.fulfillmentText
        this.setState({
					results : [
						...this.state.results,
						`You: ${result.queryResult.queryText}`
					]
        });
        if (result.queryResult.parameters.foodIngredients) {
					this.setState({
						ingredientsArr : result.queryResult.parameters.foodIngredients,
            ingredientsStr : result.queryResult.parameters.foodIngredients.join('%2C'),
            results: [...this.state.results, `Kevin: ${response}`]
          })
          Tts.speak(response, this.state.ttsConfig)
				}
        else if(intent === "give-ingredients - yes") {
          this.setState({
            results: [...this.state.results, `Kevin: ${response}`]
          })
          Tts.speak(response, this.state.ttsConfig)

          const {data} = await spoonacularAPI(this.state.ingredientsStr)
          let sentence = `I got a recipe for ${data.title}. would you like to proceed with this recipe or should I find a new recipe`
          data.analyzedInstructions[0].steps.map((step) => {
            this.setState({
              recipeSteps: [...this.state.recipeSteps, step.step]
            })
          })
          this.setState({
            results: [...this.state.results, 'Kevin: ' + sentence]
          })
          Tts.speak(sentence, this.state.ttsConfig)
        }
        else if(intent === "recipeProceed") {
          if(this.state.stepCount === 0) {
            let instruction = this.state.recipeSteps[this.state.stepCount]
            Tts.speak(instruction, this.state.ttsConfig)
            this.setState({
              results: [...this.state.results, `Kevin: ${instruction}`],
              stepCount: this.state.stepCount + 1
            })
          }
        }
        else if(intent === "newRecipe") {
          //replace old recipe with new recipe
          //Tts.speak()
        }
        else if(intent === "nextStep") {

        }
        else if(intent === "repeatThat") {

        }
        else {
          console.log('running else statement')
          this.setState({
            results: [...this.state.results, 'Kevin: ' + response]
          })
          console.log(response)
          Tts.speak(response, this.state.ttsConfig)
        }
        console.log(this.state)
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
				{this.state.results.map((result, idx) => <Text key={idx}> {result}</Text>)}
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
	container : {
		flex            : 1,
		backgroundColor : 'dodgerblue',
		alignItems      : 'center',
		justifyContent  : 'center'
	}
});
