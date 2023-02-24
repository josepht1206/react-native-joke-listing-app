import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { JokeProvider } from "./src/context/JokeContext";
import SavedJokesScreen from "./src/screens/SavedJokesScreen";
import CreateScreen from "./src/screens/CreateScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EditJokeScreen from "./src/screens/EditJokeScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Saved: SavedJokesScreen,
    Create: CreateScreen,
    Edit: EditJokeScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Jokes",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
