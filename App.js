import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SavedJokesScreen from "./src/screens/SavedJokesScreen";
import CreateScreen from "./src/screens/CreateScreen";
import HomeScreen from "./src/screens/HomeScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Saved: SavedJokesScreen,
    Create: CreateScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "          Joke Listing App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
