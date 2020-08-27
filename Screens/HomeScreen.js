import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

export default class Home extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image source={require("../assets/kindpng_147581.png")} style={styles.kevin}/>
        <Text style={styles.titleText}>Talk to Kevin</Text>

        <TouchableOpacity style={styles.button} onPress={()=>{alert("LOL, what are you guys doing not finishing this app?")}}>
          <Image source={require("../assets/kindpng_1602515.png")} style={styles.mic}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#87CEFA',
		alignItems      : 'center',
		justifyContent  : 'center'
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Chalkduster"
  },
  kevin: {
    height: 100,
    width: 100,
    marginBottom: 100
  },
  button: {
    marginTop: 10,
    marginBottom:10
  },
  mic: {
    height: 100,
    width: 70
  }
});
