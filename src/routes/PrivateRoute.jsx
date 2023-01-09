import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ isLogin }) => {
	const { location } = useLocation();

	return isLogin ? (
		<Outlet />
	) : (
		<Navigate to={'/auth/login'} state={{ form: location }} replace />
	);
};

PrivateRoute.propTypes = {
	isLogged: PropTypes.bool,
};

export default PrivateRoute;
