import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase/Firebse-config";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function ItemDetailPage({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  const deleteUser = async (item) => {
    const storage = getStorage();
    const imageRef = ref(storage, item.item_image);
    try {
      const UserDoc = doc(db, "ShopItems", item.id);
      await deleteDoc(UserDoc);
      deleteObject(imageRef);
      ToastAndroid.show("successfully Deleted!", ToastAndroid.SHORT);
      navigation.navigate("ItemsShop");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const GetConfirmation = (item) => {
    Alert.alert(
      "Confirm deletion",
      "You will not be able to recover this imaginary file! This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "delete",
          onPress: () => deleteUser(item),
        },
      ]
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.item_image }} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.item_name}</Text>
        <Text style={styles.category}>{item.item_catagory}</Text>
        <Text style={styles.stock}>Instock: {item.item_quantity}</Text>
        <Text style={styles.stock}>Warranty: {item.item_warranty}</Text>
        <Text style={styles.description}>{item.item_discription}</Text>
        <Text style={styles.price}>{item.item_price} LKR</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 25,
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0D47A1",
            width: 120,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate("EditItemsPage", { item })}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#f00",
            width: 120,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => GetConfirmation(item)}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    plex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    fontWeight: "500",
    color: "#666",
    marginBottom: 20,
  },
  stock: {
    fontSize: 17,
    fontWeight: "900",
    color: "#444",
    textAlign: "justify",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#444",
    textAlign: "justify",
    marginBottom: 20,
  },
  price: {
    fontSize: 25,
    color: "#666",
    fontWeight: "bold",
    textAlign: "right",
  },
});
