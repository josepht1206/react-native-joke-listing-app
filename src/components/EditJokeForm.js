import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const EditJokeForm = ({ route, navigation }) => {
  const { joke, jokeIndex } = route.params;
  const [newCategory, setNewCategory] = useState(joke.text);
  const [newSetup, setNewSetup] = useState(joke.text);
  const [newDelivery, setNewDelivery] = useState(joke.text);

  const handleSave = () => {
    // Update the joke data in state or database using the index passed as props
    const updatedJokes = [...joke];
    updatedJokes[jokeIndex] = {
      ...joke[jokeIndex],
      text: newCategory,
      text: newSetup,
      text: newDelivery,
    };

    // Update the state with the new jokes array
    savedJokes(updatedJokes);

    // Navigate back to the joke list screen
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        placeholder="Enter joke category"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <TextInput
        placeholder="Enter joke setup"
        value={newSetup}
        onChangeText={setNewSetup}
      />
      <TextInput
        placeholder="Enter joke delivery"
        value={newDelivery}
        onChangeText={setNewDelivery}
      />
      <Button title="Edit Joke" onPress={handleSave} />
    </View>
  );
};

export default EditJokeForm;
