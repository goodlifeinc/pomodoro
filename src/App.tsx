import React, { useReducer } from "react";
import { Grommet } from "grommet";
import Header from "./components/Header";
import Content from "./components/Content";
import Layout from "./components/Layout";
import reducer, { initialState } from "./reducers/pomodoro";
import AppContext from "./context/AppContext";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Grommet theme={theme} full>
      <AppContext.Provider value={{state, dispatch}}>
        <Layout>
          <Header />
          <Content />
        </Layout>
      </AppContext.Provider>
    </Grommet>
  );
};

export default App;
