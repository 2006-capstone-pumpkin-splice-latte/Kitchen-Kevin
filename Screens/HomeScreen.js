import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Voice from "@react-native-community/voice";
import Tts from "react-native-tts";
import spoonacularAPI from "../apis/spoon";
import { Dialogflow_V2 } from "react-native-dialogflow";
import dfConfig from "../apis/config/dialogflowConfig";
import styled from "styled-components";
import MasterButton from "../MasterButton";

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
      speaking: false,
      kevinSpeaking: false,
      transcript: [],
      ingredientsArr: [],
      allIngredientsAmounts: {},
      allIngredientsNames: [],
      recipeImage: "",
      recipeSteps: [],
      stepCount: 0,
      recipeCounter: 0,
      recipeTitle: "",
      ttsConfig: {
        iosVoiceId: "com.apple.ttsbundle.Daniel-compact",
        rate: 0.5,
      },
      screenHeight: 0,
    };
    Tts.addEventListener("tts-start", (event) => {
      console.log("TTS STARTED HAHAHAA");
      Voice.stop();
      this.setState({
        speaking: false,
        kevinSpeaking: true,
      });
    });
    Tts.addEventListener("tts-finish", (event) => {
      console.log("TTS FINISHED HAHAHAA");
      Voice.start();
      this.setState({
        speaking: true,
        kevinSpeaking: false,
      });
    });
  }

  pullIngredients = (array) => {
    let newObj = {
      names: [],
      amounts: {},
    };
    for (let i = 0; i < array.length; i++) {
      let x = array[i];
      newObj.names.push(x.name);
      newObj.amounts[x.name] = x.originalString;
    }
    return newObj;
  };

  pullAmountResponse = (ingrNames, ingrAmounts, userQuery) => {
    let response = "You will need ";
    for (let i = 0; i < userQuery.length; i++) {
      for (let j = 0; j < ingrNames.length; j++) {
        if (ingrNames[j].includes(userQuery[i])) {
          let key = ingrNames[j];
          if (i === userQuery.length - 1) {
            response += `and ${ingrAmounts[key]}.`;
          } else {
            response += `${ingrAmounts[key]}, `;
          }
        }
      }
    }
    return response;
  };

  mute = () => {
    console.log("running mute");
    this.setState({
      speaking: false,
    });
    Dialogflow_V2.finishListening();
  };

  interrupt = () => {
    console.log("running interrupt");
    Tts.stop();
    Voice.start();
    this.setState({
      kevinSpeaking: false,
      speaking: true,
    });
  };

  initiateConversation = () => {
    console.log("running init conversation");
    this.setState({
      speaking: true,
    });
    Dialogflow_V2.startListening(
      async (result) => {
        this.setState({
          speaking: false,
        });
        let intent = result.queryResult.intent.displayName;
        let response = result.queryResult.fulfillmentText;
        this.setState({
          transcript: [
            ...this.state.transcript,
            `You: ${result.queryResult.queryText}`,
          ],
        });
        if (result.queryResult.parameters.foodIngredients) {
          console.log(result.queryResult.parameters.foodIngredients);
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
          let ingredientsObj = this.pullIngredients(data.extendedIngredients);

          data.analyzedInstructions[0].steps.map((step) => {
            this.setState({
              recipeSteps: [...this.state.recipeSteps, step.step],
            });
          });
          let sentence = `I got a recipe for ${
            data.title
          }. You will need ${ingredientsObj.names.join(
            ", "
          )}. Would you like to proceed with this recipe or should I find a new recipe?`;
          this.setState({
            transcript: [...this.state.transcript, "Kevin: " + sentence],
            allIngredientsNames: ingredientsObj.names,
            allIngredientsAmounts: ingredientsObj.amounts,
            recipeImage: data.image,
            recipeTitle: data.title,
          });
          Tts.speak(sentence, this.state.ttsConfig);
        } else if (intent === "recipeProceed") {
          this.setState({
            stepCount: 0,
          });
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
              allIngredientsAmounts: this.state.allIngredientsAmounts,
            });
          }
        } else if (intent === "allIngredientsAmount") {
          console.log("ALLAMOUNT INTENT");
          console.log(result);
        } else if (intent === "ingredientAmount") {
          let query = result.queryResult.parameters["food-ingredients"];
          let amountResponse = this.pullAmountResponse(
            this.state.allIngredientsNames,
            this.state.allIngredientsAmounts,
            query
          );
          Tts.speak(amountResponse, this.state.ttsConfig);
          this.setState({
            transcript: [...this.state.transcript, `Kevin: ${amountResponse}`],
          });
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
              recipeImage: "",
              recipeTitle: "",
              allIngredientsNames: [],
              allIngredientsAmounts: {},
            });
            const { data } = await spoonacularAPI(
              this.state.ingredientsArr,
              this.state.recipeCounter
            );

            let ingredientsObj = this.pullIngredients(data.extendedIngredients);

            let sentence = `I got a new recipe for ${
              data.title
            }. You will need ${ingredientsObj.names.join(
              ", "
            )}. Would you like to proceed with this recipe or should I find another recipe?`;

            data.analyzedInstructions[0].steps.map((step) => {
              this.setState({
                recipeSteps: [...this.state.recipeSteps, step.step],
              });
            });
            this.setState({
              transcript: [...this.state.transcript, "Kevin: " + sentence],
              allIngredientsArr: ingredientsObj.names,
              allIngredientsAmounts: ingredientsObj.amounts,
              recipeImage: data.image,
              recipeTitle: data.title,
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
        } else if (intent === "rapGod") {
          this.setState({
            transcript: [...this.state.transcript, "Kevin: " + response],
          });

          Tts.speak(response, { ...this.state.ttsConfig, rate: 0.58 });
        } else {
          this.setState({
            transcript: [...this.state.transcript, "Kevin: " + response],
          });
          Tts.speak(response, this.state.ttsConfig);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <ImageBackground source={require('../assets/HomeScreen_Background.jpg')} style={styles.backgroundImage}>
      <Container>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            source={require("../assets/Kitchen_Kevin_HomeScreen_Logo.png")}
          />
          <ScrollView
            ref={(ref) => (this.ScrollView = ref)}
            style={{
              flex: 1,
              marginBottom: 120,
              marginTop: 80,
            }}
            // contentContainerStyle={{
            //   flexGrow: 1,
            // }}
            onContentSizeChange={() =>
              this.ScrollView.scrollToEnd({ animated: true })
            }
          >
            {this.state.transcript.map((result, idx) =>
              result.slice(0, 3) === "You" ? (
                <TextContainer user key={idx}>
                  <Text small dark>
                    {result.slice(5)}
                  </Text>
                </TextContainer>
              ) : (
                <TextContainer kevin key={idx}>
                  <Text black small>
                    {result.slice(7)}
                  </Text>
                </TextContainer>
              )
            )}
          </ScrollView>
          <View>
            <MasterButton
              style={{ bottom: 70 }}
              speak={this.initiateConversation}
              mute={this.mute}
              interrupt={this.interrupt}
              speakState={this.state.speaking}
              kevinSpeakState={this.state.kevinSpeaking}
            />
          </View>
        </SafeAreaView>
      </Container>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
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
  image: {
    resizeMode: "contain",
    maxWidth: 300,
    maxHeight: 90,
    position: "absolute",
    bottom: 684.5,
    borderColor: "white",
    borderRadius: 10,
    borderBottomWidth: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  }
});

const Container = styled.View`
  flex: 1;
`;

const TextContainer = styled.View`
  flex:1;
  align-items: ${(props) => (props.user ? "flex-end" : "flex-start")}
  margin:8px;
  margin-left:${(props) => (props.user ? "140px" : "10px")}
  margin-right:${(props) => (props.kevin ? "140px" : "10px")}

`;
const Text = styled.Text`
  background-color: ${(props) => (props.black ? "#22223B" : "#FEEAFA")};
  padding: 10px;
  color: ${(props) => (props.dark ? "#000" : "#FFF")};
  font-family: "AvenirNext-Regular";
  font-size: ${(props) => (props.small ? "15px" : "25px")};
  font-weight: 600;
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
`;
