import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
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
import { db } from "../Firebase/Firebse-config";

export default function AdminHome() {
  // { route }
  //const { worker_data } = route.params;
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState("");
  const [newsBlog, setNewsBlog] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const Itemdata = await getDocs(collection(db, "ShopItems"));
      setAllItems(Itemdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const Blogdata = await getDocs(collection(db, "NewsBlog"));
      setNewsBlog(Blogdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  }, []);
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1, paddingHorizontal: 10 }}
    >
      <View>
        <Text style={styles.header2Text}>
          👋 Hai,
          {/* {worker_data.username} */}
        </Text>
      </View>
      {/* <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#9E9E9E",
          marginHorizontal: 15,
          opacity: 0.5,
          marginTop: 20,
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="search" size={20} color="black" />
          <Text
            style={{
              fontSize: 15,
              marginVertical: 5,
              marginHorizontal: 15,
            }}
          >
            Search
          </Text>
        </View>
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#BEAFFE",
            borderRadius: 15,
            marginRight: 5,
            height: 80,
            width: "50%",
            borderWidth: 2,
            borderColor: "#AA77FF",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("ItemsShop")}
        >
          <Entypo name="shop" size={24} color="black" />
          <Text style={{ fontSize: 20 }}>Online Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#97DEFF",
            borderRadius: 15,
            height: 80,
            width: "50%",
            borderWidth: 2,
            borderColor: "#537FE7",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("HomeBlogPage")}
        >
          <FontAwesome5 name="blogger-b" size={24} color="black" />
          <Text style={{ fontSize: 20 }}>Tech Blog</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Online Shop</Text>
          <TouchableOpacity
            style={{ alignItems: "flex-end", padding: 10 }}
            onPress={() => navigation.navigate("ItemsShop")}
          >
            <Text style={{ fontSize: 15, justifyContent: "center" }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={allItems.slice(0, 3)}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("ItemDetailPage", { item })}
              >
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Image
                    source={{ uri: item.item_image }}
                    style={styles.image}
                  />
                  <View>
                    <Text style={styles.title}>{item.item_name}</Text>
                    <Text style={styles.subtitle}>{item.item_catagory}</Text>
                    <Text style={styles.price}>{`Rs.${item.item_price}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tech Blogs</Text>
          <TouchableOpacity
            style={{ alignItems: "flex-end", padding: 10 }}
            onPress={() => navigation.navigate("HomeBlogPage")}
          >
            <Text style={{ fontSize: 15, justifyContent: "center" }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={newsBlog.slice(0, 5)}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card_blog}
                onPress={() => navigation.navigate("DetailsBlogPage", { item })}
              >
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Image
                    source={{ uri: item.blog_image }}
                    style={styles.image}
                  />
                  <View>
                    <Text style={styles.title}>{item.blog_title}</Text>
                    <Text style={styles.subtitle}>{item.blog_subject}</Text>
                    <Text style={styles.date}>{item.blog_date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  adminHeader: {
    height: 100,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#0030FF",
    padding: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  header2Text: {
    marginLeft: 10,
    marginVertical: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    width: 200,
    overflow: "hidden",
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
  card_blog: {
    flexDirection: "row",
    width: 300,
    overflow: "hidden",
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
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    marginHorizontal: 10,
    color: "#888",
  },
  date: {
    textAlign: "right",
    fontSize: 14,
    color: "#999999",
    margin: 10,
  },
  price: {
    fontSize: 16,
    color: "#FE3A30",
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
