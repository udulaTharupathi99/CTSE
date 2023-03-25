import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import { storage, db } from "../../Firebase/Firebse-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

export default function EditAppointmentPage({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const id = item.id;
  const [formData, setFormData] = useState({
    date: new Date(),
    showDatePicker: false,
    reasons: "",
    name: "",
    phone: "",
    time: new Date(),
    showTimePicker: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await getDoc(doc(db, "Appointment", id));
        console.log("Document update data:", docRef.data());
        setFormData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setFormData({
      ...formData,
      showDatePicker: Platform.OS === "ios",
      date: currentDate,
    });
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || formData.time;
    setFormData({
      ...formData,
      showTimePicker: Platform.OS === "ios",
      time: currentTime,
    });
  };

  const handleBookAppointment = async () => {
    // Perform booking logic here
    try {
      await updateDoc(doc(db, "Appointment", id), {
        date: formData?.date.toLocaleDateString(),
        time: formData?.time.toLocaleTimeString(),
        reasons: formData?.reasons || "",
        name: formData?.name || "",
        phone: formData?.phone || "",
        description: formData?.description || "",
      });

      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("DetailsUsedPeoductPage", { item });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book an Appointment</Text>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.input_lable}>Select date</Text>
        <TouchableOpacity
          onPress={() => setFormData({ ...formData, showDatePicker: true })}
          style={styles.datePickerButton}
        >
          <Text style={{ fontSize: 17 }}>{formData.date.toLocaleString()}</Text>
        </TouchableOpacity>
        {formData.showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.input_lable}>Appointment Time: </Text>
        <TouchableOpacity
          onPress={() => setFormData({ ...formData, showTimePicker: true })}
          style={styles.datePickerButton}
        >
          <Text style={{ fontSize: 17 }}>
            {formData.time.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {formData.showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View> */}
      <TextInput
        style={styles.input}
        placeholder="Enter reasons"
        onChangeText={(text) => setFormData({ ...formData, reasons: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Discription"
        value={formData.discription}
        onChangeText={(text) => setFormData({ ...formData, discription: text })}
      />
      {/* <Button title="Book Appointment" onPress={handleBookAppointment} /> */}

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
        onPress={() => handleBookAppointment()}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#67afff",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  datePickerButton: {
    marginLeft: 20,
    borderColor: "#67afff",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
    //backgroundColor: "#f2f2f2",
  },
  input_lable: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
});
