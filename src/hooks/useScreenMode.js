const { SCREEN_MODE } = require('constants/app');
const { useSelector } = require('react-redux');

export const useScreenMode = () => {
	const screenMode = useSelector((state) => state.app.screenMode);
	const isMobile = screenMode === SCREEN_MODE.MOBILE.name;
	return { screenMode, isMobile };
};
