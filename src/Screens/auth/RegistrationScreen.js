import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";

import { registration } from "../../utils/auth";
import { AuthContext } from "../../store/authContex";
const image = require("../../../assets/images/background.jpg");
const initialCredentials = { email: "", password: "", login: "" };

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPass, setIsShowPass] = useState(true);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWidth(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setCredentials(initialCredentials);
  };

  const toggleShowPass = () => {
    setIsShowPass((prev) => !prev);
  };
  const onSubmit = async () => {
    if (credentials.password) {
      try {
        const token = await registration(
          credentials.email,
          credentials.password
        );
        authCtx.authenticate(token);

        keyboardHide();
      } catch (error) {
        Alert.alert("Помилка авторизації");
      }
    }
  };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Реєстрація</Text>
            <View
              style={{
                ...styles.inputs,
                width: width - 40,
              }}
            >
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  value={credentials.login}
                  onChangeText={(value) =>
                    setCredentials((prev) => ({ ...prev, login: value }))
                  }
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  placeholder="Логін"
                />
              </View>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  value={credentials.email}
                  onChangeText={(value) =>
                    setCredentials((prev) => ({ ...prev, email: value }))
                  }
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  placeholder="Алреса електроної пошти"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  value={credentials.password}
                  onChangeText={(value) => {
                    setCredentials((prev) => ({ ...prev, password: value }));
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  placeholder="Пароль"
                  secureTextEntry={isShowPass}
                />
                <TouchableOpacity
                  onPress={toggleShowPass}
                  style={styles.hidePass}
                >
                  <Text style={styles.hidePassText}>
                    {isShowPass ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>

            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.alterBtn}
            >
              Вже є аккаунт? Увійти.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    height: 549,
    backgroundColor: "#FFFFFF",
  },

  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    right: -15,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },

  formTitle: {
    color: "#212121",
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
  },
  inputs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  formField: {
    fontFamily: "Roboto-Regular",
    position: "relative",
  },
  hidePass: {
    position: "absolute",
    zIndex: 2,
    top: 15,
    right: 16,
  },
  hidePassText: {
    fontSize: 16,
    color: "#1B4371",
    fontWeight: "400",
    textAlign: "right",
  },

  inputTitle: { fontFamily: "Roboto-Regular" },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    height: 51,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
  },
  alterBtn: {
    paddingVertical: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
  },
});
