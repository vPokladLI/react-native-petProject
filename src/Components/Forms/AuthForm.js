import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

const AuthForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState(0);
  return (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.inputTitle}>INPUT YOUR EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginHorizontal: 10 },
  formField: {},
  inputTitle: {},
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
  },
});

export default AuthForm;
