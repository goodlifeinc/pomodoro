export const navigate = (path: string) => {
	window.history.pushState({}, path, window.location.origin + path);
	const popStateEvent = new PopStateEvent('popstate', { state: {} });
	dispatchEvent(popStateEvent);
}
