import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import jokeapi from "../api/jokeapi";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "react-native-vector-icons/FontAwesome";

const HomeScreen = () => {
  const [jokes, setJokes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    jokeApi();
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

  const LoveButton = () => {
    const [isLoved, setIsLoved] = useState(false);

    return (
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => setIsLoved(!isLoved)}
      >
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  const renderJoke = ({ item }) => {
    return (
      <View style={styles.jokesContainer}>
        <LoveButton />
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
              paddingRight: 5,
              fontSize: 18,
            }}
          >
            Dark
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredJokes}
        renderItem={renderJoke}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 8 }}
        onPress={() => navigation.navigate("Saved")}
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
