import React, { useState } from "react";
import { Pomodoro } from "../PomodoroReducer";
import { Box, Main, List, Text, Meter } from "grommet";

interface SidebarPropTypes {
  pomodoros: Array<Pomodoro>;
  dispatch: React.Dispatch<{
    type: any;
    pomodoro: Pomodoro;
  }>;
}

const Sidebar: React.FC<SidebarPropTypes> = ({ pomodoros, dispatch }) => {
  const [activeId, setActiveId] = useState(
    pomodoros.length ? pomodoros[0].id : "0"
  );
  const timeExecuted = pomodoros.reduce((memo, next) => {
    memo += next.roundsExecuted * next.timePerRound + next.secondsElapsed / 60;
    return memo;
  }, 0);
  const timePlanned = pomodoros.reduce((memo, next) => {
    memo += next.rounds * next.timePerRound;
    return memo;
  }, 0);
  return (
    <Box flex border={{ color: "brand", size: "large" }} pad="medium">
      <Box>
        <Main pad="small">
          <p>Summary</p>
          <Box pad="small">
            <Text>Total Time planned: {timePlanned} minutes</Text>
            <Text>Total Time executed: {Math.round(timeExecuted)} minutes</Text>
            <Text>
              Total Time left to execute:{" "}
              {Math.round(timePlanned - timeExecuted)} minutes
            </Text>
          </Box>
          <Box pad="small">
            <Meter
              values={[
                {
                  value: (timeExecuted / timePlanned) * 100,
                  label: "value"
                }
              ]}
            />
          </Box>
        </Main>
      </Box>
      <Box>
        <Main pad="small">
          <p>Pomodoros</p>
          <List
            primaryKey="name"
            secondaryKey="roundsLeft"
            data={pomodoros.map(p => {
              const isActive = p.id === activeId;
              const returnPomodoro = {
                ...p,
                roundsLeft: p.rounds - p.roundsExecuted,
                name: isActive ? `${p.name} - Active` : p.name
              };
              return returnPomodoro;
            })}
            onClickItem={(e: any) => {
              dispatch({
                type: "active",
                pomodoro: {
                  ...e.item,
                  name: e.item.name.replace(" - Active", "")
                }
              });
              setActiveId(e.item.id || "0");
            }}
          />
        </Main>
      </Box>
    </Box>
  );
};

export default Sidebar;
