import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AuthForm from "./src/Components/Forms/AuthForm";

// const image = { uri: "https://reactjs.org/logo-og.png" };
const image = require("./assets/images/background.jpeg");

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
