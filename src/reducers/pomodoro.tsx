const uuidv4 = require("uuid/v4");

export const initialState = {
  pomodoros: [
    // {
    //   id: uuidv4(),
    //   name: "test",
    //   rounds: 2,
    //   timePerRound: 20,
    //   restBetweenRounds: 5,
    //   roundsExecuted: 0,
    //   secondsElapsed: 0
    // },
    // {
    //   id: uuidv4(),
    //   name: "test 2",
    //   rounds: 4,
    //   timePerRound: 25,
    //   restBetweenRounds: 5,
    //   roundsExecuted: 0,
    //   secondsElapsed: 0
    // }
  ],
  activePomodoro: null
};

export type Pomodoro = {
  id?: string;
  name: string;
  rounds: number;
  timePerRound: number;
  restBetweenRounds: number;
  roundsLeft?: number;
  roundsExecuted: number;
  secondsElapsed: number;
};

function reducer(
  state: { pomodoros: Array<Pomodoro>; activePomodoro?: Pomodoro | null },
  action: { type: any; pomodoro: Pomodoro }
) {
  let pomodoro: any = null;
  let pomodoroIndex = -1;
  switch (action.type) {
    case "add":
      pomodoro = Object.assign({}, action.pomodoro);
      pomodoro.id = uuidv4();
      const newState = { ...state, pomodoros: [...state.pomodoros, pomodoro] };
      if (!newState.activePomodoro) newState.activePomodoro = pomodoro;
      return newState;
    case "active":
      pomodoro = Object.assign({}, action.pomodoro);
      return { ...state, activePomodoro: pomodoro };
    case "update":
      pomodoro = Object.assign({}, action.pomodoro);
      pomodoroIndex = state.pomodoros.findIndex(
        p => p.id === pomodoro.id
      );
      state.pomodoros.splice(pomodoroIndex, 1, pomodoro)
      return {
        ...state,
        pomodoros: state.pomodoros,
        activePomodoro: pomodoro
      };
    default:
      throw new Error();
  }
}

export default reducer;
