import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebse-config";
import { ScrollView } from "react-native";

export default function ClientHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState("");
  const [newsBlog, setNewsBlog] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const Itemdata = await getDocs(collection(db, "ShopItems"));
      setAllItems(Itemdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(allItems);

      const Blogdata = await getDocs(collection(db, "NewsBlog"));
      setNewsBlog(Blogdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  }, []);

  const handleSearch = () => {
    // Code to handle search
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>

      <View style={styles.categories}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate("HomeUsedPage")}
        >
          <MaterialIcons name="local-grocery-store" size={35} color="#332885" />
          <Text style={styles.categoryText}>Marketplace</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate("HomeAppointment")}
        >
          <AntDesign name="calendar" size={35} color="#332885" />
          <Text style={styles.categoryText}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate("ViewBlogsClient")}
        >
          <AntDesign name="book" size={35} color="#332885" />
          <Text style={styles.categoryText}>TechBlogs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../assets/menu.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.products}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  logo: {
    width: 250,
    height: 50,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  cartCountContainer: {
    backgroundColor: "#ff5722",
    paddingHorizontal: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
  cartCount: {
    color: "#fff",
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  categoryButton: {
    //elevation: 5,
    borderRadius: 10,
    alignItems: "center",
    //backgroundColor: "#AEE2FF",
    padding: 5,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#332885",
  },
  products: {
    paddingVertical: 10,
  },
  productCard: {
    width: "48%",
    marginVertical: 10,
    marginRight: "2%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 12,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  card: {
    flexDirection: "row",
    width: 200,
    overflow: "hidden",
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
    fontSize: 16,
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
    // fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
