import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

const ImagePicker = () => {
  const [photo, setPhoto] = useState(null);
  const [cameraPermissionInformation, requestPermition] =
    useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermition();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Требуется разрешение для использования камеры");
      return false;
    }
    return true;
  };
  const takePhoto = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const photo = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
    });
    setPhoto(photo.uri);
    console.log(photo.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {photo ? <Image source={photo} /> : <Text>No image taken yet...</Text>}
      </View>

      <TouchableHighlight
        style={styles.cameraButton}
        onPress={takePhoto}
        activeOpacity={0.6}
        underlayColor="#FFFFFF"
      >
        <AntDesign name="camera" size={24} color="white" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    alignItems: "center",
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
