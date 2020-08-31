import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Home extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>RECIPE</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor: '#87CEFA',
		alignItems      : 'center',
		justifyContent  : 'center'
	}
});
