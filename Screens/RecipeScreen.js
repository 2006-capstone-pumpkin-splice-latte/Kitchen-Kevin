import React, { Component } from "react";
import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components";

export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
  }
  createIngredientsList = (obj) => {
    let ingredientsArray = [];
    for (let key in obj) {
      ingredientsArray.push(obj[key]);
    }
    return ingredientsArray;
  };
  render() {
    const recipeSteps = this.props.navigation.getParam("recipeSteps");
    const recipeImage = this.props.navigation.getParam("recipeImage");
    const title = this.props.navigation.getParam("recipeTitle");

    const allIngredientsList = this.createIngredientsList(
      this.props.navigation.getParam("allIngredientsAmounts")
    );
    console.log("hello", recipeImage);

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        {recipeImage && recipeImage.length > 0 ? (
          <RecipeBackground source={{ uri: recipeImage }}>
            <SafeAreaView>
              <MainRecipe>
                <Title>{title}</Title>
                {recipeSteps ? <Divider /> : <Text></Text>}
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
        ) : (
          <RecipeBackground hidden source={{ uri: recipeImage }}>
            <SafeAreaView>
              <MainRecipe>
                <Title>{title}</Title>
                {recipeSteps ? <Divider /> : <Text></Text>}
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
        )}

        <ScrollView
          ref={(ref) => (this.ScrollView = ref)}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <DirectionsContainer>
            {allIngredientsList.length > 0 ? (
              <Text dark large style={{ fontSize: 20 }}>
                Ingredients
              </Text>
            ) : (
              <Text></Text>
            )}
            {allIngredientsList && allIngredientsList.length ? (
              <Divider dark />
            ) : (
              <Text></Text>
            )}
            {allIngredientsList && allIngredientsList.length > 0 ? (
              allIngredientsList.map((ingredient, index) => {
                return (
                  <Text small dark key={index}>
                    {ingredient}
                  </Text>
                );
              })
            ) : (
              <Text></Text>
            )}
            {!recipeSteps ? (
              <Text dark heavy large>
                No recipe
              </Text>
            ) : (
              <Text dark large style={{ fontSize: 20 }}>
                {"\n"}
                Directions
              </Text>
            )}
            <Divider dark />
            <Text dark small italic>
              {recipeSteps ? `${recipeSteps.length} Steps` : ``}
            </Text>

            <Directions>
              {recipeSteps ? (
                recipeSteps.map((step, index) => {
                  return (
                    <Text dark small key={index}>
                      {index + 1}. {step}
                      {"\n"}
                    </Text>
                  );
                })
              ) : (
                <Text dark small>
                  Ask Kevin to help you with a recipe!
                </Text>
              )}
            </Directions>
          </DirectionsContainer>
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fec89a;
`;

const Text = styled.Text`
  color: ${(props) => (props.dark ? "#000" : "#FFF")};
  font-family: "AvenirNext-Regular";
  font-size: ${(props) => (props.small ? "15px" : "25px")};
  font-weight: 600;
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
`;

const Title = styled.Text`
  text-shadow: 1px 1px 2px #000000;
  font-weight: 600;
  font-size: 25px;
  color: #fff;
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 50%;
  border-color: #E5E5E5
  border-bottom-width: ${(props) => (props.hidden ? "0px" : "10px")}
`;

const MainRecipe = styled.View`
  padding: 0 32px;
  margin: 250px 0 32px 0;
`;

const Divider = styled.View`
  border-bottom-color: ${(props) => (props.dark ? "#000" : "#FFF")};
  border-bottom-width: 2px;
  width: 180px;
  margin: 8px 0;
`;

const DirectionsContainer = styled.View`
  margin-top: -20px;
  padding: 32px;
  background-color: #fec89a;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const Directions = styled.View`
  margin-top: 16px;
`;
