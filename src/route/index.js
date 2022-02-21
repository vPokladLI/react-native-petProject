import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";

import PostScreen from "../Screens/mainScreen/PostScreen";
import CreateScreen from "../Screens/mainScreen/CreateScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="grid-view" size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="Posts"
        component={PostScreen}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.iconCreate}>
              <AntDesign name="plus" size={size} color="#FFFFFF" />
            </View>
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="md-person-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconCreate: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
