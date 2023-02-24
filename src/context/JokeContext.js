import React from "react";

const JokeContext = React.createContext();

export const JokeProvider = ({ children }) => {
  return <JokeContext.Provider>{children}</JokeContext.Provider>;
};
