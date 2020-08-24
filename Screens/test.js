import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import spoonacularAPI from '../apis/spoon';

class Test extends Component {
	static navigationOptions = {
		title : 'Recipe Information'
	};

	constructor(props) {
		super(props);

		this.state = {
			title        : '',
			image        : '',
			instructions : ''
		};
	}

	async componentDidMount() {
		const testFunc = await spoonacularAPI();
		if (testFunc.data.summary) {
			console.log('testFunc.data.summary >>>>', testFunc.data.summary);
		}
		// this.setState({
		// 	title: testFunc.title,
		// 	image: testFunc.
		// })
	}
	render() {
		return (
			<View>
				<Text>Hi</Text>
			</View>
		);
	}
}

export default Test;
