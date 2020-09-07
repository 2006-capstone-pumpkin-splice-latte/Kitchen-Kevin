import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class MasterButton extends React.Component {
  constructor(props) {
    super(props);
  }
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    this.open = !this.open;
  };
  render() {
    const { speak, mute, interrupt, speakState, kevinSpeakState } = this.props;
    const micStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };
    const silenceStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, +80],
          }),
        },
      ],
    };
    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"],
          }),
        },
      ],
    };
    return (
      <View style={[styles.container, this.props.style]}>
        {!speakState && !kevinSpeakState ? (
          <TouchableWithoutFeedback onPress={speak}>
            <Animated.View style={[styles.button, styles.secondary, micStyle]}>
              <FontAwesome5 name="microphone" size={24} color={"#000"} />
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : (
          <Text></Text>
        )}
        {!speakState && kevinSpeakState ? (
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.button,
                styles.secondary,
                micStyle,
                { opacity: 0.3 },
              ]}
            >
              <FontAwesome5 name="microphone" size={24} color={"#000"} />
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : (
          <Text></Text>
        )}

        {speakState && !kevinSpeakState ? (
          <TouchableWithoutFeedback onPress={mute}>
            <Animated.View style={[styles.button, styles.secondary, micStyle]}>
              <FontAwesome5
                name="microphone-slash"
                size={24}
                color={"#F02A4B"}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : (
          <Text></Text>
        )}

        {kevinSpeakState ? (
          <TouchableWithoutFeedback onPress={interrupt}>
            <Animated.View
              style={[styles.button, styles.secondary, silenceStyle]}
            >
              <FontAwesome5 name="comment-slash" size={24} />
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.button,
                styles.secondary,
                silenceStyle,
                { opacity: 0.3 },
              ]}
            >
              <FontAwesome5 name="comment-slash" size={24} />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <FontAwesome5 name="plus" size={24} color={"#FFF"} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#FFF",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: "#bd1d39",
    opacity: 0.95,
  },
  secondary: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#FFF",
  },
});
