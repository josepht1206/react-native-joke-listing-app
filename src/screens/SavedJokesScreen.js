import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import jokeapi from "../api/jokeapi";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedJokesScreen = ({ navigation }) => {
  const [jokes, setJokes] = useState([]);
  const [savedJokes, setSavedJokes] = useState([]);
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

  const handleDelete = async (setup) => {
    try {
      const newList = savedJokes.filter((joke) => joke.setup !== setup);
      // setSavedJokes(savedJokes.filter((joke) => joke.setup !== setup));
      await AsyncStorage.setItem("savedJokes", JSON.stringify(newList));
      setSavedJokes(newList);
      console.log("Joke saved successfully!");
      console.log(savedJokes);
      Alert.alert("Joke deleted!");
    } catch (error) {
      console.log(error);
    }
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
      Alert.alert("Joke saved successfully!");
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Jokes : </Text>
      <FlatList
        style={{ marginTop: 20 }}
        data={savedJokes}
        renderItem={renderSavedJoke}
        keyExtractor={(item, index) => index.toString()}
      />
      {editingJoke && (
        <View>
          <Text>Edit here :</Text>
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
          <Button title="Save" onPress={handleUpdate} />
        </View>
      )}
    </View>
  );
};

SavedJokesScreen.navigationOptions = ({
  navigation,
  savedJokes,
  setSavedJokes,
}) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ paddingRight: 28 }}
      onPress={() =>
        navigation.navigate("Create", {
          savedJokes: savedJokes,
          setSavedJokes: setSavedJokes,
        })
      }
    >
      <Feather name="plus" size={24} color="black" />
    </TouchableOpacity>
  ),
});

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

export default SavedJokesScreen;
