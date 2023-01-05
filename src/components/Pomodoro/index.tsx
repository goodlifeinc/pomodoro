import React, { useRef, useEffect, useContext, useState } from "react";
import { Box, Main, Meter, Stack, Text, Heading, Button } from "grommet";
import AppContext from "../../context/AppContext";

const PomodoroView: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [isStarted, setIsStarted] = useState(false);

  const savedCallback = useRef(() => {});
  const id = useRef(setInterval(() => {}, 0));

  function callback() {
    dispatch({
      type: "update",
      pomodoro: {
        ...state.activePomodoro,
        secondsElapsed: state.activePomodoro.secondsElapsed + 1
      }
    });
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {

    return () => {
      setIsStarted(false);
      clearTimeout(id.current);
    }
  }, [state.activePomodoro.id, setIsStarted])

  const toggleCountdown = () => {
    function tick() {
      savedCallback.current();
    }
    setIsStarted(!isStarted);
    if (!isStarted) {
      id.current = setInterval(tick, 1000);
    } else {
      clearInterval(id.current);
    }
  };

  const periodInSeconds = state.activePomodoro.timePerRound * 60;
  const timeLeftSeconds = periodInSeconds - state.activePomodoro.secondsElapsed;
  const meterValue = (state.activePomodoro.secondsElapsed / periodInSeconds) * 100;
  if (timeLeftSeconds === 0) {
    clearInterval(id.current);
    dispatch({
      type: "update",
      pomodoro: {
        ...state.activePomodoro,
        roundsExecuted: state.activePomodoro.roundsExecuted + 1,
        secondsElapsed: 0
      }
    });
    setIsStarted(!isStarted);
  }

  return (
    <Box flex border={{ color: "brand", size: "large" }} pad="small">
      <Main pad="small" align="center">
        <Heading level="3">{state.activePomodoro.name}</Heading>
        <Text>total rounds: {state.activePomodoro.rounds}</Text>
        <Text>rounds executed: {state.activePomodoro.roundsExecuted}</Text>
        <Text>time per round: {state.activePomodoro.timePerRound}</Text>
        <Text>rest between rounds: {state.activePomodoro.restBetweenRounds}</Text>
        <Box align="center" pad="small">
          <Stack anchor="center">
            <Meter
              type="circle"
              background="light-2"
              values={[
                {
                  value: meterValue,
                  color: meterValue > 50 ? "accent-2" : "accent-1"
                }
              ]}
            />
            <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
              <Text size="medium" weight="bold">
                {timeLeftSeconds} seconds
              </Text>
            </Box>
          </Stack>
          <Box direction="row" justify="between" margin={{ top: "medium" }} style={{display: 'block'}}>
            <Button
              type="reset"
              label="Reset"
              onClick={() => {
                dispatch({
                  type: "update",
                  pomodoro: {
                    ...state.activePomodoro,
                    secondsElapsed: 0
                  }
                });
              }}
            />
            <Button
              type="submit"
              label={!isStarted ? "Start" : "Stop"}
              primary
              onClick={toggleCountdown}
            />
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default PomodoroView;
