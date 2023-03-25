import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../Firebase/Firebse-config";
import { useNavigation } from "@react-navigation/native";

export default function SignUpPage() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isChecked, setChecked] = useState(false);

  const handleChangeText = (user, value) => {
    setUser((prevState) => ({ ...prevState, [user]: value }));
  };

  const signin = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        setDoc(doc(db, "RegisteredUser", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          role: "Client",
          email: user.email,
          username: user.username,
        });
        // setDoc(doc(db, "staff", auth.currentUser.uid), {
        //   staff_service_id: staff.staff_service_id,
        //   staff_name: staff.staff_name,
        //   staff_deparment: data[selected].value,
        //   staff_phone: staff.staff_phone,
        //   uid: auth.currentUser.uid,
        //   role: "staff",
        //   email: staff.email,
        //   username: staff.username,
        // });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });

    ToastAndroid.show(
      user.username + " Request sent successfully!",
      ToastAndroid.SHORT
    );
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.header_text}>Create an Account</Text>
      </View>
      <Text style={styles.input_lable}>Full name</Text>
      <TextInput
        style={styles.input_text}
        placeholder="Enter Full name"
        onChangeText={(val) => handleChangeText("username", val)}
      ></TextInput>
      <Text style={styles.input_lable}>Email</Text>
      <TextInput
        style={styles.input_text}
        keyboardType="email-address"
        placeholder="Enter Email"
        onChangeText={(val) => handleChangeText("email", val)}
      ></TextInput>
      <Text style={styles.input_lable}>Password</Text>
      <TextInput
        style={styles.input_text}
        secureTextEntry={true}
        placeholder="Enter password"
        onChangeText={(val) => handleChangeText("password", val)}
      ></TextInput>

      <TouchableOpacity
        style={{
          alignContent: "center",
          marginTop: 20,
          backgroundColor: "#0D47A1",
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 7,
        }}
        onPress={() => signin()}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          SIGN UP
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    top: 20,
    padding: 15,
  },
  header_text: {
    fontSize: 30,
    fontWeight: "700",
    color: "#130160",
    textAlign: "center",
  },
  input_text: {
    fontSize: 17,
    borderColor: "#67afff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  input_lable: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
});
