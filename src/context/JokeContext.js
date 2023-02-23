import React, { useReducer } from "react";

const JokeContext = React.createContext();

const jokeReducer = (state, action) => {
  switch (action.type) {
    case "add_jokepost":
      return [
        ...state,
        {
          category: `Category #${state.length + 1}`,
          setup: `Setup #${state.length + 1}`,
          delivery: `Delivery #${state.length + 1}`,
        },
      ];
    default:
      return state;
  }
};

export const JokeProvider = ({ children }) => {
  const [jokePosts, dispatch] = useReducer(jokeReducer, []);

  const addJokePost = () => {
    dispatch({ type: "add_jokepost" });
  };

  return (
    <JokeContext.Provider value={{ data: jokePosts, addJokePost }}>
      {children}
    </JokeContext.Provider>
  );
};

export default JokeContext;
