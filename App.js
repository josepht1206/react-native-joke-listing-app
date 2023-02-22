import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SavedJokes from "./src/screens/SavedJokes";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Saved: SavedJokes,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Joke List",
    },
  }
);

export default createAppContainer(navigator);
