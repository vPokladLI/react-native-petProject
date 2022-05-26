import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function CreateScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [photoURI, setPhotoURI] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Для работы приложения необходимо разрешение на опредоиление вашего местоположения"
        );
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
      aspect: [4, 3],
    });
    setPhotoURI(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photoURI, location, description });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Створити публікацію</Text>
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
              <AntDesign name="camera" size={24} color="#BDBDBD" />
            </TouchableHighlight>
          )}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <View style={styles.formField}>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Опис..."
              />
            </View>
            <View style={styles.formField}>
              <TextInput
                style={styles.input}
                onChangeText={setLocation}
                placeholder="Локація..."
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, !photoURI ? styles.buttonDisabled : null]}
          onPress={sendPhoto}
          disabled={!photoURI}
        >
          <Text style={styles.buttonText}>Створити публікацію</Text>
        </Pressable>

        <Pressable
          style={{ ...styles.button, width: 80, backgroundColor: "#F6F6F6" }}
          onPress={() => {
            setPhotoURI(null);
          }}
        >
          <Ionicons name="ios-trash-outline" size={24} color="#BDBDBD" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  header: {
    marginTop: 40,
    height: 35,
    paddingBottom: 11,
    justifyContent: "center",
    alignItems: "center",

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "500",
    color: "#212121",
  },
  cameraContainer: {
    width: "100%",
    justifyContent: "center",

    alignItems: "center",
  },

  imagePreview: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#E8E8E8",

    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
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
  buttonDisabled: {
    backgroundColor: "#E8E8E8",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexGrow: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  form: {},
  formField: { fontFamily: "Roboto-Regular" },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    padding: 10,
    marginBottom: 16,
  },
});
