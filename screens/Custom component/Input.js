import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? "#F44336" : isFocused ? "#1565C0" : "#90CAF9",
            alignItems: "center",
          },
        ]}
      >
        {/* <Icon
            name={iconName}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
          /> */}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ flex: 1 }}
          {...props}
        />
        {/* {password && (
            <Icon
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              style={{ color: COLORS.darkBlue, fontSize: 22 }}
            />
          )} */}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: "#F44336", fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    opacity: 0.6,
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 10,
    // marginTop: 10,
    padding: 7,
    paddingLeft: 10,
    // borderWidth: 2,
  },
});

export default Input;
