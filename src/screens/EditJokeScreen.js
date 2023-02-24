import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import EditJokeForm from "../components/EditJokeForm";

const EditJokeScreen = ({ navigation }) => {
  //const joke = savedJokes.find((j) => j.id === setup);

  return (
    <View>
      <EditJokeForm />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditJokeScreen;
