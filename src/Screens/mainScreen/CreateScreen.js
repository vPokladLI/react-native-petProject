// rnfs
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Camera } from "expo-camera";
import { Touchable } from "react-native-web";

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity>
          <Text style={{ color: "#FFFFFF" }}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginTop: 110,
    height: 300,
  },
});
