import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import jokeapi from "../api/jokeapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddJokeForm from "../components/AddJokeForm";

const CreateScreen = ({ navigation }) => {
  const [jokes, setJokes] = useState([]);
  const [savedJokes, setSavedJokes] = useState([]);

  useEffect(() => {
    jokeApi();
    getSavedJokes();
  }, []);

  const jokeApi = async () => {
    try {
      const response = await jokeapi.get("/Any", {
        params: {
          amount: 5,
          type: "twopart",
        },
      });
      setJokes(response.data.jokes);
      console.log(jokes);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to retrieve saved jokes from AsyncStorage on app start
  const getSavedJokes = async () => {
    try {
      const jokes = await AsyncStorage.getItem("savedJokes");
      if (jokes !== null) {
        setSavedJokes(JSON.parse(jokes));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to save a joke to AsyncStorage
  const saveJoke = async (joke) => {
    try {
      const newSavedJokes = [...savedJokes, joke];
      await AsyncStorage.setItem("savedJokes", JSON.stringify(newSavedJokes));
      setSavedJokes(newSavedJokes);
      console.log("Joke saved successfully!");
      console.log(savedJokes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddJoke = (joke) => {
    setSavedJokes([...savedJokes, joke]);
    console.log(savedJokes);
    saveJoke(joke);
    Alert.alert("Joke added successfully!");
    navigation.navigate("Saved");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Jokes : </Text>
      <AddJokeForm onAddJoke={handleAddJoke} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    margin: 10,
  },
  category: {
    margin: 5,
    fontWeight: "bold",
  },
  joke: {
    margin: 5,
  },
  jokesContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default CreateScreen;
