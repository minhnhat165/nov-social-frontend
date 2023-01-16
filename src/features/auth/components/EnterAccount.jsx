import ModalTrigger from 'components/ModalTrigger';
import { APP_NAME } from 'configs';
import LoginForm from './Login/Form/LoginForm';
import SocialLogin from './Login/SocialLogin';
import ResetPassword from './ResetPassword';
const EnterAccount = ({ title, footer, onSubmit, loading, onSocialLogin }) => {
	return (
		<div className="prose flex h-full flex-col bg-light-50 dark:bg-dark-800 lg:prose-lg">
			<Header content={title} />
			<SocialLogin onLogin={onSocialLogin} />
			<div className="relative text-center">
				<div className="absolute top-1/2 left-1/2 mt-[2px] h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-slate-300 dark:bg-dark-400"></div>
				<span className="relative bg-white px-1 text-base text-light-text-semiBold dark:bg-dark-800 dark:text-dark-200">
					or your account
				</span>
			</div>
			<LoginForm onSubmit={onSubmit} loading={loading} />

			<ModalTrigger
				trigger={
					<div className="mb-3 text-center text-base">
						<span className="cursor-pointer text-base text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700">
							Forgot password?
						</span>
					</div>
				}
			>
				{(setShow) => <ResetPassword onLogin={() => setShow(false)} />}
			</ModalTrigger>
			{footer}
		</div>
	);
};

const Header = ({ content }) => {
	return (
		<h2 className="text-center text-slate-900 dark:text-dark-50">
			{content || `Welcome to ${APP_NAME}`}
		</h2>
	);
};

export default EnterAccount;
