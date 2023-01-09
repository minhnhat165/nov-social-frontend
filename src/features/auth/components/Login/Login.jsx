import { APP_NAME } from 'constant';
import { useLogin } from 'features/auth/hooks/useLogin';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';
import LoginForm from './Form/LoginForm';
import SocialLogin from './SocialLogin';
const Login = ({ onForgotPassword }) => {
	const login = useLogin();
	const handleSubmit = (values) => {
		login.mutate(values);
	};

	console.log(login.isLoading);

	return (
		<div className="prose flex h-full flex-col bg-light-50 dark:bg-dark-800 lg:prose-lg">
			<LoginHeader />
			<SocialLogin />
			<div className="relative text-center">
				<div className="absolute top-1/2 left-1/2 mt-[2px] h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-slate-300 dark:bg-dark-400"></div>
				<span className="relative bg-white px-1 text-base text-light-text-semiBold dark:bg-dark-800 dark:text-dark-200">
					or your account
				</span>
			</div>
			<LoginForm onSubmit={handleSubmit} loading={login.isLoading} />

			<div className="mb-3 text-center text-base">
				<span
					onClick={onForgotPassword}
					className="cursor-pointer text-base text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700"
				>
					Forgot password?
				</span>
			</div>
			<div className="ms:mt-auto mt-4 text-center text-base dark:text-dark-100">
				Don't have an account yet?{' '}
				<Link
					to={routePaths.REGISTER}
					className="cursor-pointer text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700"
				>
					Create new one.
				</Link>
			</div>
		</div>
	);
};

const LoginHeader = () => {
	return (
		<h2 className="text-center text-slate-900 dark:text-dark-50">
			Login to{' '}
			<span className="text-primary-700 dark:text-primary-500">
				{APP_NAME}
			</span>
		</h2>
	);
};

export default Login;
