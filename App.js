import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SavedJokesScreen from "./src/screens/SavedJokesScreen";
import { JokeProvider } from "./src/context/JokeContext";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Saved: SavedJokesScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Jokes",
    },
  }
);

export default createAppContainer(navigator);
