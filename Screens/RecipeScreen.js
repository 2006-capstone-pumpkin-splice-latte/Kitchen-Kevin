import React, { Component } from 'react';
import { StatusBar, SafeAreaView, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import styled from 'styled-components';
// import { StatusBar } from 'expo-status-bar';

export default class RecipeScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const recipeSteps = this.props.navigation.getParam('recipeSteps');
		const recipeImage = this.props.navigation.getParam('recipeImage');
		const title = this.props.navigation.getParam('recipeTitle');

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
				<DirectionsContainer>
					<Text dark heavy large>
						Directions
					</Text>
					<Text dark small>
						{recipeSteps ? `${recipeSteps.length + 1} Steps` : `No Steps`}
					</Text>
					<Directions>
						<FlatList
							data={recipeSteps}
							keyExtractor={(item, index) => 'key' + index}
							renderItem={({ item }) => <Text>{`\u2022 ${item}`}</Text>}
						/>
					</Directions>
				</DirectionsContainer>
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: #fff;
`;

const Text = styled.Text`
	color: ${(props) => (props.dark ? '#000' : '#FFF')};
	font-family: "AvenirNext-Regular";
	fontSize: 20px;
	fontWeight: 600;
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
	border-bottom-color: #fff;
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

const Directions = styled.View`margin-top: 16px;`;

const Direction = styled.View``;

// 		return (
// 			<SafeAreaView style={styles.container}>
// 				<Image
// 					source={{
// 						width  : 350,
// 						height : 200,
// 						uri    : recipeImage
// 					}}
// 				/>
// 				<Text style={styles.title}>{title}</Text>
// 				<Text style={styles.textBlock}>{recipeSteps}</Text>
// 			</SafeAreaView>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container : {
// 		flex            : 1,
// 		backgroundColor : '#87CEFA',
// 		alignItems      : 'center',
// 		justifyContent  : 'center'
// 	},
// 	textBlock : {
// 		margin  : 12,
// 		padding : 12
// 		// borderWidth     : 1,
// 		// borderColor     : '#ccc',
// 		// backgroundColor : 'white'
// 	},
// 	title     : {
// 		fontSize   : 24,
// 		fontWeight : 'bold',
// 		margin     : 12,
// 		padding    : 12
// 	}
// });
