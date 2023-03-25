import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebse-config";

export default function HomeBlogPage() {
  const navigation = useNavigation();
  const [newsBlog, setNewsBlog] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(collection(db, "NewsBlog"));
      setNewsBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  });
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          margin: 10,
          borderRadius: 10,
          paddingVertical: 10,
          backgroundColor: "#3669C9",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("AddBlogPage")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="add-circle" size={30} color="#fff" />
          <Text
            style={{
              color: "#fff",
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            ADD NEW NEWS BLOG
          </Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={newsBlog}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetailsBlogPage", { item })}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.blog_image }} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.blog_title}</Text>
              <Text style={styles.author}>{item.blog_subject}</Text>
              {/* <Text style={styles.author}>By {item.author}</Text> */}
              <Text style={styles.date}>{item.blog_date}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    marginBottom: 10,

    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  author: {
    fontSize: 17,
    color: "#999999",
    marginBottom: 4,
  },
  date: {
    textAlign: "right",
    fontSize: 17,
    color: "#999999",
  },
});
