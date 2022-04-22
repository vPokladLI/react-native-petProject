import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

export default function CreateScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoURI, setPhotoURI] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("location permission", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);
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
      aspect: [16, 9],
    });
    setPhotoURI(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    // console.log(photoURI);
  };

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("Posts", { photoURI, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Создать публикацию</Text>
      </View>

      <View style={styles.cameraContainer}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={sendPhoto}>
          <Text style={styles.buttonText}>Опубликовать</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPhoto(null);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    height: 88,
    paddingBottom: 11,
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000000",
  },
  headerTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    fontWeight: "500",
    color: "#212121",
  },
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
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 51,
    width: 343,

    backgroundColor: "#FF6C00",

    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexBasis: "50%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
});
