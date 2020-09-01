import React, {Component} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, SafeAreaView, Button, ScrollView} from 'react-native'

export default class TranscriptScreen extends Component {
  constructor(props) {
		super(props)
  }
  render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title1}>Kitchen Kevin</Text>
				<Text style={styles.title2}>Conversation Text Log</Text>
				<ScrollView
					ref={(ref) => (this.ScrollView = ref)}
					style={{ flex: 1 }}
					contentContainerStyle={{
						flexGrow       : 1
					}}
					onContentSizeChange={() => this.ScrollView.scrollToEnd({ animated: true })}
				>
					{transcript.map((result, idx) => (
						<Text style={styles.textlog} key={idx}>
							{result}
						</Text>
					))}
				</ScrollView>
				<StatusBar style="auto" />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#87CEFA',
		alignItems      : 'center',
		justifyContent  : 'center'
	},
	title1    : {
		fontWeight : 'bold',
		fontSize   : 30,
		fontFamily : 'Chalkduster'
	},
	title2    : {
		fontFamily : 'Chalkduster',
		fontSize   : 25
	},
	textlog   : {
		padding  : 6,
		margin   : 10,
		fontSize : 20,
		color    : 'white'
	}
});
