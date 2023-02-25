import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import jokeapi from "../api/jokeapi";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavedJokesScreen from "./SavedJokesScreen";
import AddJokeForm from "../components/AddJokeForm";
import EditJokeForm from "../components/EditJokeForm";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const CreateScreen = ({ navigation }) => {
  const [jokes, setJokes] = useState([]);
  const [savedJokes, setSavedJokes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editingJoke, setEditingJoke] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSetup, setNewSetup] = useState("");
  const [newDelivery, setNewDelivery] = useState("");

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

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredJokes = jokes.filter((joke) =>
    selectedCategories.includes(joke.category)
  );

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
  };

  const handleDelete = async (setup) => {
    setSavedJokes(savedJokes.filter((joke) => joke.setup !== setup));
  };

  const handleEdit = (setup) => {
    // set the joke to be edited to state
    const jokeToEdit = savedJokes.find((joke) => joke.setup === setup);
    setEditingJoke(jokeToEdit);
  };

  const handleUpdate = () => {
    // update the selected joke's information and save the updated list to AsyncStorage
    const updatedJokes = savedJokes.map((joke) => {
      if (joke.setup === editingJoke.setup) {
        return {
          ...joke,
          category: newCategory,
          setup: newSetup,
          delivery: newDelivery,
        };
      }
      return joke;
    });
    AsyncStorage.setItem("savedJokes", JSON.stringify(updatedJokes))
      .then(() => {
        setSavedJokes(updatedJokes);
        setEditingJoke(null);
        setNewCategory("");
        setNewSetup("");
        setNewDelivery("");
      })
      .catch((error) => console.error(error));
  };

  // Function to render a single saved joke
  const renderSavedJoke = ({ item }) => {
    return (
      <View style={styles.jokesContainer}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => handleDelete(item.setup)}
        >
          <EvilIcons name="trash" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => handleEdit(item.setup)}
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.category}>Category : {item.category}</Text>
        <Text style={styles.joke}>Setup : {item.setup}</Text>
        <Text style={styles.joke}>Delivery : {item.delivery}</Text>
        <Text style={styles.joke}>ID : {item.id}</Text>
        <Text style={styles.joke}>Type : {item.type}</Text>
      </View>
    );
  };

  const renderJoke = ({ item }) => {
    return (
      <View style={styles.jokesContainer}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => saveJoke(item)}
        >
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </TouchableOpacity>
        <>
          <Text style={styles.category}>Category : {item.category}</Text>
          <Text style={styles.joke}>Setup : {item.setup}</Text>
          <Text style={styles.joke}>Delivery : {item.delivery}</Text>
          <Text style={styles.joke}>ID : {item.id}</Text>
          <Text style={styles.joke}>Type : {item.type}</Text>
        </>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Add Jokes</Text>
      {/* <FlatList
        style={{ marginTop: 20 }}
        data={savedJokes}
        renderItem={renderSavedJoke}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <AddJokeForm onAddJoke={handleAddJoke} />
      {editingJoke && (
        <View>
          <TextInput value={newCategory} onChangeText={setNewCategory} />
          <TextInput value={newSetup} onChangeText={setNewSetup} />
          <TextInput value={newDelivery} onChangeText={setNewDelivery} />
          <Button title="Save" onPress={handleUpdate} />
        </View>
      )}
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
