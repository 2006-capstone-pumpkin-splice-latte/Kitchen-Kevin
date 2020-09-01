import React, { Component } from "react";
import {
  View,
  Title,
  Image,
  Text,
  StyleSheet,
  List,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-navigation";

export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recipeSteps = this.props.navigation.getParam(
      "recipeSteps",
      "no-recipe"
    );
    const recipeImage = this.props.navigation.getParam(
      "recipeImage",
      "no-recipe-image"
    );
    const title = this.props.navigation.getParam("recipeTitle", "no-title");

    console.log("RECIPE STEPS", recipeSteps);
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            width: 350,
            height: 200,
            uri: recipeImage,
          }}
        />
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.textBlock}>{recipeSteps}</Text> */}
        {/* {recipeSteps.map((step, index) => {
          return <Text key={index}>{step}</Text>;
        })} */}
        <FlatList
          style={styles.textlog}
          data={recipeSteps}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => <Text>{`\u2022 ${item}`}</Text>}
        />
      </SafeAreaView>
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
  textBlock: {
    margin: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 12,
    padding: 12,
  },
  textlog: {
    padding: 6,
    margin: 10,
    fontSize: 20,
    color: "white",
  },
});
