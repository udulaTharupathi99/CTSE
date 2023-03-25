import {
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem } from "react-native-material-menu";
import AdminHome from "./screens/AdminHome";
import ItemsShop from "./screens/ItemsShop";
import AddItems from "./screens/AddItems";
import ItemDetailPage from "./screens/ItemDetailPage";
import EditItemsPage from "./screens/EditItemsPage";
import HomeBlogPage from "./screens/NewsBlogs/HomeBlogPage";
import AddBlogPage from "./screens/NewsBlogs/AddBlogPage";
import DetailsBlogPage from "./screens/NewsBlogs/DetailsBlogPage";
import EditBlogPage from "./screens/NewsBlogs/EditBlogPage";
import ClientHome from "./screens/ClientHome";
import AddProductClientPage from "./screens/ClientMacketplace/AddProductClientPage";
import HomeUsedPage from "./screens/ClientMacketplace/HomeUsedPage";
import DetailsUsedPeoductPage from "./screens/ClientMacketplace/DetailsUsedPeoductPage";
import EditUsedProductPage from "./screens/ClientMacketplace/EditUsedProductPage";
import AddAppointmentPage from "./screens/Appointment/AddAppointmentPage";
import HomeAppointment from "./screens/Appointment/HomeAppointment";
import ViewBlogsClient from "./screens/NewsBlogs/ViewBlogsClient";
import ViewBlogDetailClient from "./screens/NewsBlogs/ViewBlogDetailClient";
import EditAppointmentPage from "./screens/Appointment/EditAppointmentPage";
import LoginHome from "./screens/authentication/Login";
import SignUpPage from "./screens/authentication/SignUp";

const stack = createNativeStackNavigator();

function LogoTitle() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <View>
      <Menu
        style={{ width: 200 }}
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("./assets/menu.png")}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          onPress={() => {
            const auth = getAuth();
            auth.signOut().then(() => navigation.navigate("Login"));
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </View>
  );
}

export default function app() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <stack.Navigator>
          {/* <stack.Screen name="Login" component={LoginHome} />
          <stack.Screen name="Sign Up" component={SignUpPage} /> */}
          <stack.Screen
            name="AdminHome"
            component={AdminHome}
            options={{
              headerBackVisible: false,
              headerShadowVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          />
          {/* <stack.Screen
            name="ClientHome"
            component={ClientHome}
            options={{
              headerBackVisible: false,
              headerShadowVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          /> */}

          <stack.Screen name="ItemsShop" component={ItemsShop} />
          <stack.Screen name="AddItems" component={AddItems} />
          <stack.Screen name="EditItemsPage" component={EditItemsPage} />
          <stack.Screen name="ItemDetailPage" component={ItemDetailPage} />
          <stack.Screen name="HomeBlogPage" component={HomeBlogPage} />
          <stack.Screen name="AddBlogPage" component={AddBlogPage} />
          <stack.Screen name="DetailsBlogPage" component={DetailsBlogPage} />
          <stack.Screen name="EditBlogPage" component={EditBlogPage} />
          <stack.Screen
            name="AddProductClientPage"
            component={AddProductClientPage}
          />
          <stack.Screen
            name="DetailsUsedPeoductPage"
            component={DetailsUsedPeoductPage}
          />
          <stack.Screen name="HomeUsedPage" component={HomeUsedPage} />
          <stack.Screen
            name="EditUsedProductPage"
            component={EditUsedProductPage}
          />
          <stack.Screen
            name="AddAppointmentPage"
            component={AddAppointmentPage}
          />
          <stack.Screen name="HomeAppointment" component={HomeAppointment} />
          <stack.Screen name="ViewBlogsClient" component={ViewBlogsClient} />
          <stack.Screen
            name="ViewBlogDetailClient"
            component={ViewBlogDetailClient}
          />
          <stack.Screen
            name="EditAppointmentPage"
            component={EditAppointmentPage}
          />
        </stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
