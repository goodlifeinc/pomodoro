import React from 'react';
import { Pomodoro } from '../reducers/pomodoro';

interface IAppContext {
	state?: object;
	dispatch?: React.Dispatch<{
	  type: any;
	  pomodoro: Pomodoro;
	}>;
};

const AppContext = React.createContext<any>(null);

export default AppContext;
