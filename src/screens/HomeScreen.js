import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import jokeapi from "../api/jokeapi";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavedJokesScreen from "./SavedJokesScreen";

const HomeScreen = ({ navigation }) => {
  const [jokes, setJokes] = useState([]);
  const [savedJokes, setSavedJokes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  // Function to render a single saved joke
  const renderSavedJoke = ({ item }) => {
    return (
      <View style={styles.jokesContainer}>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleCategorySelection("Programming")}
        >
          <Text
            style={{
              textDecorationLine: selectedCategories.includes("Programming")
                ? "underline"
                : "none",
              backgroundColor: selectedCategories.includes("Programming")
                ? "grey"
                : "transparent",
              paddingLeft: 5,
              fontSize: 18,
            }}
          >
            Programming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelection("Misc")}>
          <Text
            style={{
              textDecorationLine: selectedCategories.includes("Misc")
                ? "underline"
                : "none",
              backgroundColor: selectedCategories.includes("Misc")
                ? "grey"
                : "transparent",
              fontSize: 18,
            }}
          >
            Misc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelection("Dark")}>
          <Text
            style={{
              textDecorationLine: selectedCategories.includes("Dark")
                ? "underline"
                : "none",
              backgroundColor: selectedCategories.includes("Dark")
                ? "grey"
                : "transparent",
              paddingRight: 5,
              fontSize: 18,
            }}
          >
            Dark
          </Text>
        </TouchableOpacity>
      </View>
      <Text>Random Jokes</Text>
      <FlatList
        data={filteredJokes}
        renderItem={renderJoke}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>Saved Jokes</Text>
      <FlatList
        style={{ marginTop: 20 }}
        data={savedJokes}
        renderItem={renderSavedJoke}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={{ paddingRight: 8 }}
        onPress={() => navigation.navigate("Saved", { savedJokes })}
      >
        <MaterialIcons name="favorite" size={24} color="black" />
      </TouchableOpacity>
    ),
  };
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

export default HomeScreen;
