import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import Voice from "@react-native-community/voice";
import Tts from "react-native-tts";
import spoonacularAPI from "../apis/spoon";
import { Dialogflow_V2 } from "react-native-dialogflow";
import dfConfig from "../apis/config/dialogflowConfig";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

export default class MicrophoneScreen extends React.Component {
  constructor(props) {
    super(props);

    Dialogflow_V2.setConfiguration(
      dfConfig.client_email,
      dfConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dfConfig.project_id
    );
    this.state = {
      results: [],
      ingredientsArr: [],
      allIngredientsArr: [],
      recipeSteps: [],
      stepCount: 0,
      recipeCounter: 0,
      recipeTitle: "",
      ttsConfig: {
        iosVoiceId: "com.apple.ttsbundle.Daniel-compact",
        rate: 0.5,
      },
      screenHeight: 0,
    }
    // Voice.onSpeechResults = (result) => {
    //   clearTimeout(Dialogflow_V2.silenceTimer)
    //   if (result.value) {
    //     Dialogflow_V2.speechResult = result.value;
    //   }
    //   Dialogflow_V2.silenceTimer = setTimeout(() => {
    //     Voice.stop()
    //   }, 1500)
    // }
    Tts.addEventListener('tts-start', (event) => {
      console.log('TTS STARTED HAHAHAA')
      Voice.stop()
    })
    Tts.addEventListener('tts-finish', (event) => {
      console.log('TTS FINISHED HAHAHAA')
      Voice.start()
    })
  }

  pullNames(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      let currentElement = array[i];
      newArray.push(currentElement.name);
    }
    return newArray;
  }
  initiateConversation() {
    console.log('running init conversation')
    Dialogflow_V2.startListening(
      async (result) => {
        let intent = result.queryResult.intent.displayName;
        let response = result.queryResult.fulfillmentText;
        this.setState({
          results: [
            ...this.state.results,
            `You: ${result.queryResult.queryText}`,
          ],
        });
        if (result.queryResult.parameters.foodIngredients) {
          this.setState({
            ingredientsArr: result.queryResult.parameters.foodIngredients,
            results: [...this.state.results, `Kevin: ${response}`],
          });
          Tts.speak(response, this.state.ttsConfig);
        } else if (intent === "give-ingredients - yes") {
          this.setState({
            results: [...this.state.results, `Kevin: ${response}`],
          });
          Tts.speak(response, this.state.ttsConfig);

          const { data } = await spoonacularAPI(this.state.ingredientsArr);

          let allIngredients = this.pullNames(data.extendedIngredients);
          let sentence = `I got a recipe for ${
            data.title
          }. You will also need ${allIngredients.join(
            ", "
          )}. Would you like to proceed with this recipe or should I find a new recipe?`;

          data.analyzedInstructions[0].steps.map((step) => {
            this.setState({
              recipeSteps: [...this.state.recipeSteps, step.step],
            });
          });
          this.setState({
            results: [...this.state.results, "Kevin: " + sentence],
            allIngredientsArr: allIngredients,
          });

          Tts.speak(sentence, this.state.ttsConfig);
        } else if (intent === "recipeProceed") {
          if (this.state.stepCount === 0) {
            let instruction = this.state.recipeSteps[this.state.stepCount];
            Tts.speak(instruction, this.state.ttsConfig);
            this.setState({
              results: [...this.state.results, `Kevin: ${instruction}`],
              stepCount: this.state.stepCount + 1,
            });
            this.props.navigation.navigate("Recipe");
          }
        } else if (intent === "newRecipe") {
          //replace old recipe with new recipe
          if (this.state.recipeCounter === 4) {
            let lastRecipeMessage = "Sorry, homie, there are no more recipes.";
            Tts.speak(lastRecipeMessage, this.state.ttsConfig);
            this.setState({
              results: [...this.state.results, `Kevin: ${lastRecipeMessage}`],
            });
          } else {
            this.setState({
              recipeCounter: this.state.recipeCounter + 1,
              recipeSteps: [],
            });
            const { data } = await spoonacularAPI(
              this.state.ingredientsArr,
              this.state.recipeCounter
            );

            let allIngredients = this.pullNames(data.extendedIngredients);

            let sentence = `I got a new recipe for ${
              data.title
            }. You will need ${allIngredients.join(
              ", "
            )}. Would you like to proceed with this recipe or should I find another recipe?`;

            data.analyzedInstructions[0].steps.map((step) => {
              this.setState({
                recipeSteps: [...this.state.recipeSteps, step.step],
              });
            });
            this.setState({
              results: [...this.state.results, "Kevin: " + sentence],
              allIngredientsArr: allIngredients,
            });
            Tts.speak(sentence, this.state.ttsConfig);
          }
        } else if (intent === "nextStep") {
          if (this.state.stepCount === this.state.recipeSteps.length) {
            let finishedMessage = "You are finished. Good job. Enjoy the eats.";
            Tts.speak(finishedMessage, this.state.ttsConfig);
            this.setState({
              results: [...this.state.results, `Kevin: ${finishedMessage}`],
            });
          } else {
            let instruction = this.state.recipeSteps[this.state.stepCount];
            Tts.speak(instruction, this.state.ttsConfig);
            this.setState({
              results: [...this.state.results, `Kevin: ${instruction}`],
              stepCount: this.state.stepCount + 1,
            });
          }
        } else {
          // else if (intent === "repeatThat") {
          //   let lastResponse = this.state.results[
          //     this.state.results.length - 2
          //   ].slice(6);
          //   Tts.speak(`Sure, I said, ${lastResponse}`, this.state.ttsConfig);
          //   this.setState({
          //     results: [...this.state.results, `Kevin: ${lastResponse}`],
          //   });
          // }
          console.log("running else statement");
          this.setState({
            results: [...this.state.results, "Kevin: " + response],
          });
          Tts.speak(response, this.state.ttsConfig);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title1}>Kitchen Kevin</Text>
        <Text style={styles.title2}>Conversation Text Log</Text>
        <ScrollView
          ref={(ref) => (this.ScrollView = ref)}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-around",
          }}
          onContentSizeChange={() =>
            this.ScrollView.scrollToEnd({ animated: true })
          }
        >
          {this.state.results.map((result, idx) => (
            <Text
              style={styles.textlog}
              key={idx}
            >
              {result}
            </Text>
          ))}
        </ScrollView>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: "center",
    justifyContent: "center"
	},
	title1: {
		fontWeight: "bold",
		fontSize: 30,
		fontFamily: "Chalkduster"
	},
	title2: {
		fontFamily: "Chalkduster",
		fontSize:25
	},
	textlog: {
			padding: 6,
			margin: 10,
			fontSize: 20,
			color: "white"
	}
});
