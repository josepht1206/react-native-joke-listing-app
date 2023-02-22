import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const SavedJokes = () => {
  const [term, setTerm] = useState("");
  return (
    <View>
      <Text>Saved Jokes</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedJokes;
