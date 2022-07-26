import { useState } from "react";
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
  const [cameraPermissionInformation, requestPermition] =
    useCameraPermissions();

  const [photoURI, setPhotoURI] = useState(null);
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
      aspect: [16, 9],
    });
    setPhotoURI(photo.uri);
    // console.log(photoURI);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.image} />
        ) : (
          <TouchableHighlight
            style={styles.cameraButton}
            onPress={takePhoto}
            activeOpacity={0.6}
            underlayColor="#FFFFFF"
          >
            <AntDesign name="camera" size={24} color="white" />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    width: "100%",
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
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
