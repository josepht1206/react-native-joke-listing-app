import React from "react";
import { View, Text, FlatList } from "react-native";

const SavedJokesScreen = () => {
  return (
    <View>
      <Text>Saved Jokes</Text>
      <FlatList
        data={savedJokes}
        renderItem={renderSavedJoke}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SavedJokesScreen;
