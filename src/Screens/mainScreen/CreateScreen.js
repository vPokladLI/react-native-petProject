import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { Camera } from "expo-camera";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      console.log("camera permission", status);
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("location permission", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    setIsLoading(true);
    const picture = await camera.takePictureAsync();
    setPhoto(picture.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setIsLoading(false);
    // console.log("photo", photo);
    // console.log("location", location);
  };
  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("Posts", { photo, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Создать публикацию</Text>
      </View>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <TouchableHighlight
          style={styles.cameraButton}
          onPress={takePhoto}
          activeOpacity={0.6}
          underlayColor="#FFFFFF"
          onLongPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          {!isLoading ? (
            <AntDesign name="camera" size={24} color="white" />
          ) : (
            <FontAwesome5 name="spinner" size={24} color="white" />
          )}
        </TouchableHighlight>
      </Camera>

      {photo && (
        <View>
          <Image style={styles.photo} source={{ uri: photo }} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPhoto(null);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={sendPhoto}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
  camera: {
    height: "50%",
    marginHorizontal: 16,
    borderRadius: 8,
    borderEndWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    marginBottom: 30,
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
  button: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: "red",

    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
  },
  photo: {
    position: "absolute",
    marginHorizontal: 16,
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",

    justifyContent: "space-around",
  },
});
