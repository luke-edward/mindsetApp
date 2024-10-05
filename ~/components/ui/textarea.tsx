import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

interface TextareaProps extends TextInputProps {
  // Add any additional props specific to your Textarea component
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <TextInput {...props} style={[styles.textarea, props.style]} multiline />
  );
};

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
