import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Transcript from './Screens/TranscriptScreen';
import HomeScreen from './Screens/HomeScreen';
import RecipeScreen from './Screens/RecipeScreen'

const TabNavigator = createMaterialBottomTabNavigator({
	Home : {
		screen            : HomeScreen,
		navigationOptions : {
			tabBarLabel   : 'Home',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: 'pink' },
			tabBarIcon    : () => (
				<View>
					<Icon name={'home'} size={30} style={{ color: 'black' }} />
				</View>
			)
		}
	},
	Recipe: {
    screen: RecipeScreen,
    navigationOptions : {
			tabBarLabel   : 'Recipe',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: 'pink' },
			tabBarIcon    : () => (
				<View>
					<Icon name={'person'} size={30} style={{ color: 'black' }} />
				</View>
			)
		}
  },
	Transcript : {
		screen            : Transcript,
		navigationOptions : {
			tabBarLabel   : 'Transcript',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: 'pink' },
			tabBarIcon    : () => (
				<View>
					<Icon name={'person'} size={30} style={{ color: 'black' }} />
				</View>
			)
		}
  }
});

export default createAppContainer(TabNavigator);
