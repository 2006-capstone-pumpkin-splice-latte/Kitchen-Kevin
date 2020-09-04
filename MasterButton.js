import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class FloatingButton extends React.Component {
  constructor(props) {
    super(props)
  }
  animation = new Animated.Value(0)

  toggleMenu = () => {
    const toValue = this.open ? 0: 1
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver:true
    }).start()
    this.open = !this.open
  }
  render() {
    const micStyle = {
      transform: [
        {
          scale:this.animation
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0, -80]
          })
        }
      ]
    }
    const silenceStyle = {
      transform: [
        {
          scale:this.animation
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0, +80]
          })
        }
      ]
    }
    const rotation = {
      transform: [
          {
          rotate: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: ["0deg", "45deg"]
          })
        }
      ]
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, micStyle]}>
            <FontAwesome5 name='microphone-slash' size={24} color={'#F02A4B'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, silenceStyle]}>
            <FontAwesome5 name='comment-slash' size={24}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <FontAwesome5 name='plus' size={24} color={"#FFF"}/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute'
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  },
  menu: {
    backgroundColor: '#F02A4B'
  },
  secondary: {
    width:60,
    height:60,
    borderRadius: 60/2,
    backgroundColor: '#FFF',
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  }
})
