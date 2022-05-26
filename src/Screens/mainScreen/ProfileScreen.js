import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useState, useContext } from "react";
import { logOut } from "../../utils/auth";
import { AuthContext } from "../../store/authContex";

export default function ProfileScreen() {
  const authCtx = useContext(AuthContext);
  const logOutHandler = () => {
    authCtx.logOut();
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="Вийти" onPress={logOutHandler}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
