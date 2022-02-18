import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AuthForm from "./src/Components/Forms/AuthForm";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const image = require("./assets/images/background.jpg");
const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Hello!</Text>
        <AuthForm style={styles.authForm} />
      </ImageBackground>
    </View>
  );
};

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
    marginBottom: 30,
    fontFamily: "Roboto-reg",
  },
});

export default App;
