import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AuthForm from "./src/Components/Forms/AuthForm";
import * as Font from 'expo-font';
import {AppLoading} from "expo"

const image = require("./assets/images/background.jpeg");
const loadApplication = async () =>{
  await Font.loadAsync({"Roboto-reg" : require('./assets/fonts/Roboto-Regular.ttf')})
}

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Hello!</Text>
      <AuthForm style={styles.authForm} />
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    marginBottom: 30
  },
});

export default App;
