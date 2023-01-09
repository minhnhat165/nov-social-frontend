import store from '../redux/store';

const checkIncludesUser = (
	userIds,
	userId = store.getState().auth.user._id
) => {
	return userIds.includes(userId);
};

export default checkIncludesUser;
