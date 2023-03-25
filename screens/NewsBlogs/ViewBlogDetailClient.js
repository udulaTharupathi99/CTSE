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
import { db } from "../../Firebase/Firebse-config";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Share } from "react-native";

export default function ViewBlogDetailClient({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  const onShare = async (item) => {
    try {
      const result = await Share.share({
        title:item.blog_title,
        message: 'Titile - '+' '+item.blog_title+'\n'+'Subject - '+' '+
            item.blog_subject+'\n'+
            
            'Description - '+' '+item.blog_description+'\n \n'+
            'Image link - '+' '+item.blog_image.toString() ,
        url: item.blog_image,
        // dialogTitle:item.blog_title
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.blog_image }} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{item.blog_date}</Text>
        <Text style={styles.title}>{item.blog_title}</Text>
        <Text style={styles.category}>{item.blog_subject}</Text>
        <Text style={styles.description}>{item.blog_description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 25,
          marginHorizontal: 20,
        }}
      ></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={() => onShare(item)}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date: {
    textAlign: "right",
    fontSize: 17,
    color: "#999999",
  },
  imageContainer: {
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#eee",
    
  },
  button: {
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 10,
    width:200,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
});
