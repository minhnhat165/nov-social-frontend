import { APP_NAME } from 'configs';
import EnterAccount from '../EnterAccount';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';
import { useLogin } from 'features/auth/hooks/useLogin';
import { useSocialLogin } from 'features/auth/hooks/useSocialLogin';

const Login = ({ remote }) => {
	const login = useLogin(remote);
	const handleSubmit = (values) => {
		login.mutate(values);
	};
	const socialLogin = useSocialLogin(remote);
	return (
		<EnterAccount
			title={
				<>
					Login to{' '}
					<span className="text-primary-700 dark:text-primary-500">
						{remote?.name || APP_NAME}
					</span>
				</>
			}
			onSubmit={handleSubmit}
			onSocialLogin={socialLogin.mutate}
			loading={login.isLoading}
			footer={
				<div className="ms:mt-auto mt-4 text-center text-base dark:text-dark-100">
					Don't have an account yet?{' '}
					<Link
						to={routePaths.REGISTER}
						className="cursor-pointer text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700"
					>
						Create new one.
					</Link>
				</div>
			}
		/>
	);
};

export default Login;
