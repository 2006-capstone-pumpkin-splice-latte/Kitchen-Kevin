import React, { Component } from "react";
import {
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from "react-native";
import styled from "styled-components";

export default class InstructionsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RecipeBackground source={require("../assets/HowTo_Background.jpg")}>
        <Container>
          <CustomImage
            source={require("../assets/Kitchen_Kevin_HomeScreen_Logo.png")}
          />
          <Credits top style={{ top: 112 }}>
            created by
          </Credits>
          <Credits top style={{ top: 128 }}>
            Anderson Yoon, Adam Sue, Clark Chen, Simon Zeng
          </Credits>
          <RoundedTouchableOpacity>
            <Title>Instructions </Title>
            <ContentText>
              1. To start, press microphone on the home screen to tell Kevin
              what ingredients you have.
              {"\n"}
              {"\n"}
              2. To choose a recipe, say "Proceed" to begin cooking.
              {"\n"}
              {"\n"}
              3. If you're curious how much of an ingredient you need, ask
              Kevin.
              {"\n"}
              {"\n"}
              4. To tell Kevin to go to the next step, say "next step."
              {"\n"}
              {"\n"}
              5. Enjoy your cooking experience!
            </ContentText>
          </RoundedTouchableOpacity>
        </Container>
      </RecipeBackground>
    );
  }
}

const Container = styled.View`
  flex: 1;
  margin: 16px;
  align-items: center;
  justify-content: center;
`;

const CustomImage = styled.Image`
  resize-mode: contain;
  max-width: 300px;
  max-height: 90px;
  position: absolute;
  bottom: 668.5px;
  border-color: white;
  border-radius: 10px;
  border-bottom-width: 10px;
  opacity: 0.9;
`;
const Title = styled.Text`
  font-family: "AvenirNext-Regular";
  font-weight: 600;
  font-size: 24px;
  color: ${(props) => (props.white ? "white" : "black")};
  text-align: center;
`;
const ContentText = styled.Text`
  font-family: "AvenirNext-Regular";
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.white ? "white" : "black")};
  margin: 16px;
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const RoundedTouchableOpacity = styled.TouchableOpacity`
  height: 450px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  width: 360px;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
  margin-top: 16px;
  opacity: 0.8;
  padding-left: 15px;
  padding-right: 15px;
`;

const Credits = styled.Text`
  color: #fff;
  font-weight: 600;
  position: absolute
  text-align: center;
  font-size: 12px;
`;
