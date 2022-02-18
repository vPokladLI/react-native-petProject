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
  Dimensions
} from "react-native";

const initialCredentials = { email: "", password: "" };

const AuthForm = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  useEffect(()=>{
    const onChange = ()=>{
      const width = Dimensions.get('window').width
      setWidth(width)
    }
    const subscription = Dimensions.addEventListener('change', onChange)
    return ()=>subscription?.remove()
  },[])
  const [width, setWidth] = useState(()=>{Dimensions.get('window').width})
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(credentials);
    setCredentials(initialCredentials);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <View
          
        
          style={{ ...styles.form, width: width - 40, marginBottom: isShowKeyboard ? 30 : 150 }}
        >
          <View style={styles.formField}>
            <Text style={styles.inputTitle}>INPUT YOUR EMAIL</Text>
            <TextInput
              style={styles.input}
              value={credentials.email}
              onChangeText={(value) =>
                setCredentials((prev) => ({ ...prev, email: value }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              placeholder="name@example.com"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.formField}>
            <Text style={{ ...styles.inputTitle, marginTop: 10 }}>
              INPUT YOUR PASSWORD
            </Text>
            <TextInput
              style={styles.input}
              value={credentials.password}
              onChangeText={(value) => {
                setCredentials((prev) => ({ ...prev, password: value }));
              }}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              placeholder="password"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={keyboardHide}>
            <Text style={styles.buttonTitle}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  formField: { fontFamily: "Roboto-reg" },
  inputTitle: { fontFamily: "Roboto-reg" },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#4f5bd5",
    height: 40,
    alignItems: "center",
    marginTop: 20,

    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#ffffff",
    fontFamily: "Roboto-reg",
  },
});

export default AuthForm;
