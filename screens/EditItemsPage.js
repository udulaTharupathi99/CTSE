import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebse-config";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/Firebse-config";

export default function EditItemsPage({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [updateitem, setUpdateitem] = useState({
    item_name: "",
    item_catagory: "",
    item_price: "",
    item_quantity: "",
    item_warranty: "",
    item_discription: "",
    item_image: "",
  });
  const [selectedImage, setSelectedImage] = useState(item.item_image);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await getDoc(doc(db, "ShopItems", id));
        console.log("Document update data:", docRef.data());
        setUpdateitem({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    fetchData();
  }, []);

  const AddItems = async () => {
    if (!selectedImage) {
      console.log("Please select an image");
      return;
    }
    const storageRef = ref(
      storage,
      selectedImage.substring(selectedImage.lastIndexOf("/") + 1)
    );
    try {
      const img = await fetch(selectedImage);
      const bytes = await img.blob();
      const snapshot = await uploadBytes(storageRef, bytes);
      console.log("Uploaded a blob or file!");
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);

      await updateDoc(doc(db, "ShopItems", id), {
        item_name: updateitem?.item_name || "",
        item_catagory: updateitem?.item_catagory || "",
        item_price: updateitem?.item_price || "",
        item_quantity: updateitem?.item_quantity || "",
        item_warranty: updateitem?.item_warranty || "",
        item_discription: updateitem?.item_discription || "",
        item_image: url || "",
      });
      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("User List");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangeText = (name, value) => {
    setUpdateitem({ ...updateitem, [name]: value });
  };

  const openImagePickerAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      console.log("1" + bytes);
    }
  };
  return (
    <View>
      <ScrollView style={styles.main_container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          EDIT ITEMS
        </Text>
        <Text style={styles.input_lable}>Upload Image</Text>

        <TouchableOpacity
          style={styles.input_text}
          placeholder="Pick an image from camera roll"
          onPress={openImagePickerAsync}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <Entypo name="image" size={24} color="black" />
            <Text style={{ fontSize: 18, marginLeft: 10 }}>Pick a photo</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.input_lable}>Item name</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter Item Name"
          value={updateitem.item_name}
          onChangeText={(val) => handleChangeText("item_name", val)}
        ></TextInput>

        <Text style={styles.input_lable}>Item category</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter item category"
          value={updateitem.item_catagory}
          onChangeText={(val) => handleChangeText("item_catagory", val)}
        ></TextInput>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.input_lable}>Item price</Text>
            <TextInput
              style={styles.input_text}
              placeholder="Enter price"
              value={updateitem.item_price}
              onChangeText={(val) => handleChangeText("item_price", val)}
            ></TextInput>
          </View>
          <View style={{ flex: 0.5, marginLeft: 20 }}>
            <Text style={styles.input_lable}>Quantity</Text>
            <TextInput
              style={styles.input_text}
              keyboardType="numeric"
              placeholder="Enter Quantity"
              value={updateitem.item_quantity}
              onChangeText={(val) => handleChangeText("item_quantity", val)}
            ></TextInput>
          </View>
        </View>

        <Text style={styles.input_lable}>warranty period</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="numeric"
          placeholder="Enter Warranty pereod"
          value={updateitem.item_warranty}
          onChangeText={(val) => handleChangeText("item_warranty", val)}
        ></TextInput>
        <Text style={styles.input_lable}>Discription</Text>
        <TextInput
          style={styles.discription_text}
          placeholder="Enter Discription"
          multiline={true}
          numberOfLines={10}
          value={updateitem.item_discription}
          onChangeText={(val) => handleChangeText("item_discription", val)}
        ></TextInput>

        <TouchableOpacity
          style={{
            alignContent: "center",
            marginTop: 10,
            marginBottom: 30,
            backgroundColor: "#0D47A1",
            height: 45,
            marginHorizontal: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => AddItems()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 10,
  },
  input_lable: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  input_text: {
    borderColor: "#67afff",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  discription_text: {
    borderColor: "#67afff",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
    height: 100,
  },
  header_text: {
    fontSize: 25,
    fontWeight: "700",
    color: "#130160",
    textAlign: "center",
  },
  thumbnail: {
    width: 250,
    height: 200,
    resizeMode: "contain",
  },
});
