import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

interface IStyle {
  container: ViewStyle;
  //   header: ViewStyle;
  //   headerTitle: TextStyle;
  //   post: ViewStyle;
  //   imageContainer: ViewStyle;
  //   image: ImageStyle;
  //   description: TextStyle;
}
const LocationPicker = () => {
  return (
    <View style={styles.container}>
      <Text>LocationPrewiev</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create<IStyle>({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default LocationPicker;
