import React, { SyntheticEvent } from "react";
import { Pomodoro } from "../PomodoroReducer";
import {
  Box,
  Form,
  FormField,
  Button
} from "grommet";

interface AddPomodoroPropTypes {
  dispatch: React.Dispatch<{
    type: any;
    pomodoro: Pomodoro;
  }>;  
  onCancel: () => void;
}

const AddPomodoro: React.FC<AddPomodoroPropTypes> = ({ dispatch, onCancel }) => {
  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const pomodoro: Pomodoro = {
      name: String(data.get("name")),
      rounds: Number(data.get("rounds")),
      timePerRound: Number(data.get("timePerRound")),
      restBetweenRounds: Number(data.get("restBetweenRounds")),
      roundsExecuted: 0,
      secondsElapsed: 0
    };
    dispatch({ type: "add", pomodoro });
    onCancel();
  };
  return (
    <div>
      <Box fill align="center" justify="center" animation="fadeIn">
        <Box width="medium" border={{ color: "brand", size: "large" }} pad="medium">
          <Form
            onReset={(event: any) => {}}
            onSubmit={onFormSubmit}
          >
            <FormField label="Name" name="name" required />
            <FormField label="Rounds" name="rounds" required />
            <FormField label="Time per round" name="timePerRound" required />
            <FormField
              label="Rest between rounds"
              name="restBetweenRounds"
              required
            />
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Button label="Cancel" onClick={(e) => {onCancel()}} />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Create" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </div>
  );
};

export default AddPomodoro;
