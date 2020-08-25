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
      currentRecipe: []
		};
	}

	// async componentDidMount() {
	// 	const testFunc = await spoonacularAPI(ingredientsStr);
	// 	if (testFunc.data) {
	// 		console.log('testFunc.data >>>>', testFunc.data);
	// 	}
	// 	// this.setState({
	// 	// 	title: testFunc.title,
	// 	// 	image: testFunc.
	// 	// })
	// }

	// When Kevin says let me look for recipe with those ingredients,
	// I want to call the backend api

	initiateConversation() {
		Dialogflow_V2.startListening(
			async (result) => {
        console.log(this.state)
        let intent = result.queryResult.intent.displayName
        this.setState({
					results : [
						...this.state.results,
						`You: ${result.queryResult.queryText}`,
						`Kevin: ${result.queryResult.fulfillmentText}. `
					]
        });
        Tts.speak(
					`${result.queryResult.fulfillmentText}.`,
					{
						iosVoiceId : 'com.apple.ttsbundle.Daniel-compact',
						rate       : 0.5
					}
        )
        if (result.queryResult.parameters.foodIngredients) {
					this.setState({
						ingredientsArr : result.queryResult.parameters.foodIngredients,
						ingredientsStr : result.queryResult.parameters.foodIngredients.join('%2C')
					});
				}
        if(intent === "give-ingredients - yes") {
          const {data} = await spoonacularAPI(this.state.ingredientsStr)
          if(data) {
            console.log(data.analyzedInstructions)
          }
          // map((stepsssss) => {
          //   console.log(stepsssss.step)
          // })
          // const recipe = await spoonacularAPI()
          //get the recipe
          //setState - TTs recipe
          //Tts.speak(I got a recipe for "nameOfRecipe". would you like to proceed with this recipe or should i find a new recipe)
          //data.title = recipeName
          //data.summary = description
        }
        if(intent === "recipeProceed") {
          //Tts.speak()
        }
        if(intent === "newRecipe") {
          //replace old recipe with new recipe
          //Tts.speak()
        }
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
