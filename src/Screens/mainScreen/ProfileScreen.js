import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useState } from "react";
import ImagePicker from "../../Components/ImagePicker";
export default function ProfileScreen() {
  console.log(process.env.REACT_APP_FIREBASE_KEY);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <ImagePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
