import React, { useState, useReducer, useEffect } from "react";
import { Box, Grommet, Button } from "grommet";
import Sidebar from "./Sidebar";
import Pomodoro from "./Pomodoro";
import AddPomodoro from "./AddPomodoro";
import reducer, { initialState } from "./PomodoroReducer";

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
  const [isAddNew, setIsAddNew] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (!state.pomodoros.length) {
      setIsAddNew(true);
    }
  }, [state.pomodoros.length]);
  const pomodoro = state.activePomodoro || state.pomodoros[0];
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <Box
          tag="header"
          direction="row"
          align="center"
          justify="start"
          background="brand"
          pad={{ left: "medium", right: "small", vertical: "small" }}
          elevation="medium"
        >
          <Button label="All Pomodoros" onClick={() => setIsAddNew(false)} />
          <Button label="Add Pomodoro" onClick={() => setIsAddNew(true)} />
        </Box>
        <Box flex pad="large">
          {!isAddNew ? (
            <Box
              flex
              direction="row"
              overflow={{ horizontal: "hidden" }}
              animation="fadeIn"
            >
              <Sidebar pomodoros={state.pomodoros} dispatch={dispatch} />
              {null !== pomodoro && undefined !== pomodoro ? (
                <Pomodoro
                  pomodoro={pomodoro}
                  dispatch={dispatch}
                  setIsStarted={setIsStarted}
                  isStarted={isStarted}
                />
              ) : null}
            </Box>
          ) : (
            <AddPomodoro
              onCancel={() => setIsAddNew(false)}
              dispatch={dispatch}
            />
          )}
        </Box>
      </Box>
    </Grommet>
  );
};

export default App;
