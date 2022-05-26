import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

export default function PostScreen({ route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
      for (let post of posts) {
        console.log(post);
      }
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ваші публікації</Text>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.photoURI }} style={styles.image} />
            </View>
            {item.description && (
              <Text style={styles.description}>{item?.description}</Text>
            )}

            <Text>{item.location?.coords?.longitude}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
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
  post: {
    marginBottom: 32,
  },
  description: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontWeight: "500",
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "green",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
});
