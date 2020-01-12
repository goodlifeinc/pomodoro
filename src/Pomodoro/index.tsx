import React, { useRef, useEffect } from "react";
import { Pomodoro } from "../PomodoroReducer";
import { Box, Main, Meter, Stack, Text, Heading, Button } from "grommet";

interface PomodoroPropTypes {
  pomodoro: Pomodoro;
  dispatch: React.Dispatch<{
    type: any;
    pomodoro: Pomodoro;
  }>;
  setIsStarted: (arg: boolean) => void;
  isStarted: boolean;
}

const PomodoroView: React.FC<PomodoroPropTypes> = ({
  pomodoro,
  dispatch,
  setIsStarted,
  isStarted
}) => {
  const savedCallback = useRef(() => {});
  const id = useRef(setInterval(() => {}, 0));

  function callback() {
    dispatch({
      type: "update",
      pomodoro: {
        ...pomodoro,
        secondsElapsed: pomodoro.secondsElapsed + 1
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
  }, [pomodoro.id])

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

  const periodInSeconds = pomodoro.timePerRound * 60;
  const timeLeftSeconds = periodInSeconds - pomodoro.secondsElapsed;
  const meterValue = (pomodoro.secondsElapsed / periodInSeconds) * 100;
  if (timeLeftSeconds === 0) {
    clearInterval(id.current);
    dispatch({
      type: "update",
      pomodoro: {
        ...pomodoro,
        roundsExecuted: pomodoro.roundsExecuted + 1,
        secondsElapsed: 0
      }
    });
    setIsStarted(!isStarted);
  }

  return (
    <Box flex border={{ color: "brand", size: "large" }} pad="small">
      <Main pad="small" align="center">
        <Heading level="3">{pomodoro.name}</Heading>
        <Text>total rounds: {pomodoro.rounds}</Text>
        <Text>rounds executed: {pomodoro.roundsExecuted}</Text>
        <Text>time per round: {pomodoro.timePerRound}</Text>
        <Text>rest between rounds: {pomodoro.restBetweenRounds}</Text>
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
          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button
              type="reset"
              label="Reset"
              onClick={() => {
                dispatch({
                  type: "update",
                  pomodoro: {
                    ...pomodoro,
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
