import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputArea: {
    width: "100%",
    height: 60,
    backgroundColor: "#D4AF37",
    flexDirection: "row",
    borderRadius: 30,
    paddingLeft: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
    marginLeft: 10,
  },
});

export default function SignInput({
  IconSvg,
  placeholder,
  value,
  onChangeText,
  password,
}) {
  return (
    <View style={styles.inputArea}>
      <IconSvg width="24" height="24" fill="#fefeff" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fefeff"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </View>
  );
}
