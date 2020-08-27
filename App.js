import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import spoonacularAPI from './apis/spoon';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import dfConfig from './apis/config/dialogflowConfig';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeScreen from './Screens/HomeScreen';
import MicrophoneScreen from './Screens/MicrophoneScreen';

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
					<Icon name={'home'} size={25} style={{ color: 'black' }} />
				</View>
			)
		}
	},
	Test : {
		screen            : MicrophoneScreen,
		navigationOptions : {
			tabBarLabel   : 'Test',
			activeColor   : 'dodgerblue',
			inactiveColor : 'gray',
			barStyle      : { backgroundColor: 'pink' },
			tabBarIcon    : () => (
				<View>
					<Icon name={'person'} size={25} style={{ color: 'black' }} />
				</View>
			)
		}
	}
});

export default createAppContainer(TabNavigator);
