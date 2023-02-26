import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddJokeForm = ({ onAddJoke }) => {
  const [category, setCategory] = useState("");
  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");

  const handleAddJoke = () => {
    onAddJoke({ category, setup, delivery });

    setCategory("");
    setSetup("");
    setDelivery("");
  };

  return (
    <View>
      <TextInput
        style={styles.inputForm}
        placeholder="Enter joke category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.inputForm}
        placeholder="Enter joke setup"
        value={setup}
        onChangeText={setSetup}
      />
      <TextInput
        style={styles.inputForm}
        placeholder="Enter joke delivery"
        value={delivery}
        onChangeText={setDelivery}
      />
      <Button title="Add Joke" onPress={handleAddJoke} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputForm: {
    margin: 5,
  },
});

export default AddJokeForm;
