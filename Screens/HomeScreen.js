import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Voice from "@react-native-community/voice";
import Tts from "react-native-tts";
import spoonacularAPI from "../apis/spoon";
import { Dialogflow_V2 } from "react-native-dialogflow";
import dfConfig from "../apis/config/dialogflowConfig";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    Dialogflow_V2.setConfiguration(
      dfConfig.client_email,
      dfConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dfConfig.project_id
    );
    this.state = {
      started: false,
      transcript: [],
      ingredientsArr: [],
      allIngredientsArr: [],
      recipeImage: "",
      recipeSteps: [],
      stepCount: 0,
      recipeCounter: 0,
      recipeTitle: "",
      ttsConfig: {
        iosVoiceId: "com.apple.ttsbundle.Daniel-compact",
        rate: 0.5,
      },
    };
    Tts.addEventListener("tts-start", (event) => {
      console.log("TTS STARTED HAHAHAA");
      Voice.stop();
    });
    Tts.addEventListener("tts-finish", (event) => {
      console.log("TTS FINISHED HAHAHAA");
      Voice.start();
    });
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
    console.log("running init conversation");
    Dialogflow_V2.startListening(
      async (result) => {
        let intent = result.queryResult.intent.displayName;
        let response = result.queryResult.fulfillmentText;
        this.setState({
          transcript: [
            ...this.state.transcript,
            `You: ${result.queryResult.queryText}`,
          ],
        });
        if (result.queryResult.parameters.foodIngredients) {
          this.setState({
            ingredientsArr: result.queryResult.parameters.foodIngredients,
            transcript: [...this.state.transcript, `Kevin: ${response}`],
          });
          Tts.speak(response, this.state.ttsConfig);
        } else if (intent === "give-ingredients - yes") {
          this.setState({
            transcript: [...this.state.transcript, `Kevin: ${response}`],
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
            transcript: [...this.state.transcript, "Kevin: " + sentence],
            allIngredientsArr: allIngredients,
            recipeImage: data.image,
            recipeTitle: data.title,
          });

          Tts.speak(sentence, this.state.ttsConfig);
        } else if (intent === "recipeProceed") {
          if (this.state.stepCount === 0) {
            let instruction = this.state.recipeSteps[this.state.stepCount];
            Tts.speak(instruction, this.state.ttsConfig);
            this.setState({
              transcript: [...this.state.transcript, `Kevin: ${instruction}`],
              stepCount: this.state.stepCount + 1,
            });
            this.props.navigation.navigate("Recipe", {
              recipeSteps: [...this.state.recipeSteps],
              recipeImage: this.state.recipeImage,
              recipeTitle: this.state.recipeTitle,
            });
          }
        } else if (intent === "newRecipe") {
          //replace old recipe with new recipe
          if (this.state.recipeCounter === 4) {
            let lastRecipeMessage = "Sorry, homie, there are no more recipes.";
            Tts.speak(lastRecipeMessage, this.state.ttsConfig);
            this.setState({
              transcript: [
                ...this.state.transcript,
                `Kevin: ${lastRecipeMessage}`,
              ],
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
              transcript: [...this.state.transcript, "Kevin: " + sentence],
              allIngredientsArr: allIngredients,
            });
            Tts.speak(sentence, this.state.ttsConfig);
          }
        } else if (intent === "nextStep") {
          if (this.state.stepCount === this.state.recipeSteps.length) {
            let finishedMessage = "You are finished. Good job. Enjoy the eats.";
            Tts.speak(finishedMessage, this.state.ttsConfig);
            this.setState({
              transcript: [
                ...this.state.transcript,
                `Kevin: ${finishedMessage}`,
              ],
            });
          } else {
            let instruction = this.state.recipeSteps[this.state.stepCount];
            Tts.speak(instruction, this.state.ttsConfig);
            this.setState({
              transcript: [...this.state.transcript, `Kevin: ${instruction}`],
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
            transcript: [...this.state.transcript, "Kevin: " + response],
          });
          Tts.speak(response, this.state.ttsConfig);
        }
        // this.props.navigation.setParams({ transcript: this.state.transcript })
        // console.log(this.props.navigation.state.params.transcript)
        if (this.state.started === false) {
          this.setState({
            started: true,
          });
          this.props.navigation.navigate("Transcript", {
            transcript: this.state.transcript,
          });
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
        <Image
          source={require("../assets/kindpng_147581.png")}
          style={styles.kevin}
        />
        <Text style={styles.titleText}>Talk to Kevin</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.initiateConversation();
          }}
        >
          <Image
            source={require("../assets/kindpng_1602515.png")}
            style={styles.mic}
          />
        </TouchableOpacity>
        <Button
          title="Stop Talking to Kevin"
          onPress={() => {
            Dialogflow_V2.finishListening();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEFA",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Chalkduster",
  },
  kevin: {
    height: 100,
    width: 100,
    marginBottom: 100,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  mic: {
    height: 100,
    width: 70,
  },
});
