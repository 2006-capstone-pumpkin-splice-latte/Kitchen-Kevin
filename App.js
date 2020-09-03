import React from 'react';
import {View} from 'react-native';


import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from './Screens/HomeScreen';
import RecipeScreen from './Screens/RecipeScreen'
import InstructionsScreen from './Screens/InstructionsScreen';

const TabNavigator = createMaterialBottomTabNavigator({
	Home : {
		screen            : HomeScreen,
		navigationOptions : {
			tabBarLabel   : 'Home',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: '#E5E5E5' },
			tabBarIcon    : () => (
				<View>
					<FontAwesome5 name='home' size={23}  />
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
			barStyle      : { backgroundColor: '#E5E5E5' },
			tabBarIcon    : () => (
				<View>
					<FontAwesome5 name='utensils' size={23}  />
				</View>
			)
		}
	},
	Instructions: {
    screen: InstructionsScreen,
    navigationOptions : {
			tabBarLabel   : 'Instructions',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: '#E5E5E5' },
			tabBarIcon    : () => (
				<View>
					<FontAwesome5 name='book' size={23}  />
				</View>
			)
		}
  }
});

export default createAppContainer(TabNavigator);
