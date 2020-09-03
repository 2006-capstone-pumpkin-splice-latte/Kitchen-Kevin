import React, { Component } from "react";
import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components";

export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recipeSteps = this.props.navigation.getParam("recipeSteps");
    const recipeImage = this.props.navigation.getParam("recipeImage");
    const title = this.props.navigation.getParam("recipeTitle");

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <RecipeBackground source={{ uri: recipeImage }}>
          <SafeAreaView>
            <MainRecipe>
              <Text>{title}</Text>
              <Divider />
            </MainRecipe>
          </SafeAreaView>
        </RecipeBackground>
        <ScrollView
          ref={(ref) => (this.ScrollView = ref)}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <DirectionsContainer>
            {/* <Text dark heavy large> */}
            {!recipeSteps ? (
              <Text dark heavy large>
                No recipe
              </Text>
            ) : (
              <Text dark large style={{ fontSize: 20 }}>
                Directions
              </Text>
            )}
            <Divider dark />
            <Text dark small italic>
              {recipeSteps ? `${recipeSteps.length + 1} Steps` : ``}
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
  background-color: #fff;
`;

const Text = styled.Text`
  color: ${(props) => (props.dark ? "#000" : "#FFF")};
  font-family: "AvenirNext-Regular";
  font-size: ${(props) => (props.small ? "15px" : "25px")};
  font-weight: 600;
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 50%;
`;

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
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
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const Directions = styled.View`
  margin-top: 16px;
`;

