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
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../Firebase/Firebse-config";
import { useNavigation } from "@react-navigation/native";

export default function EditBlogPage({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const id = item.id;
  const [updateitem, setUpdateitem] = useState({
    blog_title: "",
    blog_subject: "",
    blog_description: "",
    blog_date: "",
    blog_image: "",
  });
  const [selectedImage, setSelectedImage] = useState(item.blog_image);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await getDoc(doc(db, "NewsBlog", id));
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

      await updateDoc(doc(db, "NewsBlog", id), {
        blog_title: updateitem?.blog_title || "",
        blog_subject: updateitem?.blog_subject || "",
        blog_description: updateitem?.blog_description || "",
        blog_date: new Date().toDateString(),
        blog_image: url || "",
      });
      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("HomeBlogPage");
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
          EDIT BLOG
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

        <Text style={styles.input_lable}>Blog title</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter Blog title"
          value={updateitem.blog_title}
          onChangeText={(val) => handleChangeText("blog_title", val)}
        ></TextInput>

        <Text style={styles.input_lable}>Item subject</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter blog subject"
          value={updateitem.blog_subject}
          onChangeText={(val) => handleChangeText("blog_subject", val)}
        ></TextInput>
        <Text style={styles.input_lable}>Discription</Text>
        <TextInput
          style={styles.discription_text}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={10}
          value={updateitem.blog_description}
          onChangeText={(val) => handleChangeText("blog_description", val)}
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
