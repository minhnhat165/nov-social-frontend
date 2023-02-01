const { useNavigate } = require('react-router-dom');

const useGoToProfile = () => {
	const navigation = useNavigate();
	return (userId) => {
		navigation(`/profile/${userId}`);
	};
};

export default useGoToProfile;
