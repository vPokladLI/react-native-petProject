import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";

const initialCredentials = { email: "", password: "", login: "" };

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [width, setWidth] = useState(Dimensions.get("window").width);

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
    console.log(credentials);
    setCredentials(initialCredentials);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Регистрация</Text>
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
                  setCredentials((prev) => ({ ...prev, email: value }))
                }
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                placeholder="Логин"
              />
            </View>
            <View style={styles.formField}>
              <TextInput
                style={styles.input}
                value={credentials.email}
                onChangeText={(value) =>
                  setCredentials((prev) => ({ ...prev, login: value }))
                }
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                placeholder="Адрес электронной почты"
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
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={keyboardHide}>
              <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.avatar}>
            <TouchableOpacity style={styles.addAvatar}>
              <Image
                source={require("../../assets/images/Union.svg")}
                style={styles.addAvatarImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.alterBtn}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    right: -13,
    bottom: 14,
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  addAvatarImage: {
    width: 13,
    height: 13,
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
  formField: { fontFamily: "Roboto-Regular" },
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
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
  },
});
