import { APP_NAME } from 'configs';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';
import RegisterForm from './Form/RegisterForm';

const Register = () => {
	return (
		<div className="prose flex h-full flex-col bg-light-50 dark:bg-dark-800 lg:prose-lg">
			<RegisterHeader />
			<RegisterForm />
			<RegisterFooter />
		</div>
	);
};
const RegisterHeader = () => {
	return (
		<h2 className="text-center text-slate-900 dark:text-dark-50">
			Create an{' '}
			<span className="text-primary-700 dark:text-primary-500">
				{APP_NAME}
			</span>
		</h2>
	);
};

const RegisterFooter = () => {
	return (
		<div className="ms:mt-auto mt-4 text-center text-base dark:text-dark-100">
			<div>
				Already have an account?{' '}
				<Link
					to={routePaths.LOGIN}
					className="cursor-pointer text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Register;
