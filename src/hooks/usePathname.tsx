import React from 'react';

export default (): string => {
	const [path, setPath] = React.useState(window.location.pathname);
	const listenToPopstate = () => {
	  const winPath = window.location.pathname;
	  setPath(winPath);
	};
	React.useEffect(() => {
		console.log('registering popstate');
	  window.addEventListener("popstate", listenToPopstate);
	  return () => {
		window.removeEventListener("popstate", listenToPopstate);
	  };
	}, []);
	return path;
  };