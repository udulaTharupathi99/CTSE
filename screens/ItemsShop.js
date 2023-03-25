import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  FlatList,
  TextInput,
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
import { db } from "../Firebase/Firebse-config";

export default function ItemsShop() {
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(collection(db, "ShopItems"));
      setAllItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilteredItems(allItems);
    };
    getUser();
  }, []);

  const handleSearch = (text) => {
    const filtered = allItems.filter((item) =>
      item.item_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Ionicons name="search-outline" size={30} color="#333" />
        <TextInput
          style={{ flex: 1, marginLeft: 10, fontSize: 18 }}
          placeholder="Search items"
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ItemDetailPage", { item })}
          >
            <Image source={{ uri: item.item_image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.item_name}</Text>
              <Text style={styles.subtitle}>{item.item_catagory}</Text>
              <Text style={styles.price}>{`Rs.${item.item_price}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
      <TouchableOpacity
        style={{
          margin: 10,
          borderRadius: 10,
          paddingVertical: 10,
          backgroundColor: "#3669C9",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("AddItems")}
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
            ADD ITEMS
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
    width: 150,
    height: 150,
    margin: 5,
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
  price: {
    fontSize: 16,
    color: "#FE3A30",
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
