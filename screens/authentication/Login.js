import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase/Firebse-config";

export default function LoginHome() {
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated with ID:", user.uid);

        const getDate = async (id) => {
          const docRef = await getDoc(doc(db, "RegisteredUser", id));

          if (docRef.exists()) {
            const myData = docRef.data();
            const worker_data = docRef.data();
            if (myData.role === "Admin") {
              console.log("ok");
              navigation.navigate("AdminHome", { worker_data });
            }
            if (myData.role === "Client") {
              console.log("ok");
              navigation.navigate("ClientHome", { worker_data });
            }
          } else {
            console.log("No such document!");
          }
        };
        getDate(user.uid);
      } else {
        console.log("User is not authenticated.");
      }
    });
    return subscribe;
  }, []);

  const signin = async () => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // return { user };
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.header_text}>Welcome to TechSpot</Text>
        <Text style={{ color: "#130160", textAlign: "center", fontSize: 17 }}>
          Login to Continoue
        </Text>
      </View>
      <View>
        <Text style={styles.input_lable}>Email</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="email-address"
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Text style={styles.input_lable}>Password</Text>
        <TextInput
          style={styles.input_text}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <TouchableOpacity
          style={{
            alignContent: "center",
            marginTop: 35,
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
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#130160",
              fontSize: 17,
              textAlign: "center",
              marginRight: 7,
            }}
          >
            You don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text
              style={{
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 17,
                color: "#1565C0",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    top: 50,
    margin: 15,
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
    borderWidth: 1.5,
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
