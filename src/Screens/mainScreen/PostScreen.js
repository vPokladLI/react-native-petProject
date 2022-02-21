import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

export default function PostScreen() {
  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
