import React, { useContext, useEffect } from "react";
import {
  Box
} from "grommet";
import PomodoroView from "../../components/Pomodoro";
import Sidebar from "../../components/Sidebar";
import AppContext from "../../context/AppContext";
import { navigate } from "../../utils";

const Main: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    useEffect(() => {
        if (!state.pomodoros.length) {
            setTimeout(() => navigate('/new'), 100);
        }
    }, [state.pomodoros.length]);
    if (!state.pomodoros.length) return null;
    return (
        <Box
            flex
            direction="row"
            overflow={{ horizontal: "hidden" }}
            animation="fadeIn"
        >
            <Sidebar pomodoros={state.pomodoros} dispatch={dispatch} />
            {null !== state.activePomodoro && undefined !== state.activePomodoro ? (
                <PomodoroView />
            ) : null}
        </Box>
    );
};

export default Main;
