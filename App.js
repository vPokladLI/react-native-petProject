import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import AuthForm from "./src/Components/Forms/AuthForm";

// const image = { uri: "https://reactjs.org/logo-og.png" };
const image = require("./assets/images/background.jpeg");

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView>
        <Text style={styles.text}>Test app#333</Text>
        <AuthForm />
      </SafeAreaView>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  input: {
    // width: 150,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
});

export default App;
