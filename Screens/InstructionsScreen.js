import React, { Component } from "react";
import { Image, StatusBar, SafeAreaView, ScrollView, Text } from "react-native";
import styled from "styled-components";

export default class InstructionsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
        <RecipeBackground
          source={require('../assets/HowTo_Background.jpg')}
        >
          <Container>
        <CustomImage
          source={require('../assets/Kitchen_Kevin_Logo.png')}
          />
          {/* </Container> */}
          {/* <Container> */}
        <Title white>How to use Kitchen Kevin: </Title>
        {/* </Container> */}
        {/* <Container> */}
        <ContentText white>
        1. To start, press microphone on the home screen to tell Kevin what ingredients you have.
        {'\n'}
        2. When you decide on a recipe, say "Proceed" to begin cooking.
        {'\n'}
        3. If you're curious how much of an ingredient you need, ask Kevin.
        {'\n'}
        4. Say "next step" to go to the next step.

        </ContentText>
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
`

const CustomImage = styled.Image`
  width: 200px;
  height: 200px;
  border-color: ${props => props.light || 'white'};
  border-width: 2px;
  border-radius: 50px;
`
const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.white ? 'white' : 'black'};
  text-align: center;
  margin: 16px;
`
const ContentText = styled.Text`
  font-size: 14px;
  color: ${props => props.white ? 'white' : 'black'};
  margin: 16px;
`
const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
