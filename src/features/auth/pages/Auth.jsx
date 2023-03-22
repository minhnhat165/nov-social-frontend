import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { Button } from 'components/Action';
import Layout from '../components/Layout';
import Login from '../components/Login';
import { Modal } from 'components/OverLay';
import Register from '../components/Register';
import ResetPassword from '../components/ResetPassword';
import TextGradient from 'components/Effect/TextGradient';
import TextPanel from '../components/TextPanel';
import clsx from 'clsx';
import { routePaths } from 'routes/routeConfig';

const Auth = () => {
	const { pathname } = useLocation();
	const isLogin = useMemo(() => {
		const path = pathname.split('/');
		const endpoint = path[path.length - 1];
		if (endpoint === 'login' || !endpoint) return true;
		if (endpoint === 'register') return false;
	}, [pathname]);

	const [isResetPassword, setIsResetPassword] = useState(false);

	return (
		<Layout title={isLogin ? 'Login' : 'Register'}>
			<div className="relative flex aspect-auto h-full w-full overflow-hidden bg-light-50 shadow-md dark:bg-dark-800 dark:shadow-none sm:mx-4 sm:h-[620px] sm:max-w-[870px] sm:rounded-xl">
				<PanelContainer
					placement={isLogin ? 'right' : 'left'}
					responsive="w-full sm:w-1/2 md:p-8"
					active={!isLogin}
				>
					<Register />
				</PanelContainer>
				<PanelContainer
					placement={isLogin ? 'right' : 'left'}
					responsive="w-full sm:w-1/2 md:p-8"
					active={isLogin}
				>
					<Login onForgotPassword={() => setIsResetPassword(true)} />
				</PanelContainer>
				<OverlayContainer isLeft={isLogin}>
					<OverlayPanel placement="left" show={isLogin}>
						<TextPanel
							title="Well comeback"
							subtitle="To keep connected with us please login with your personal info"
						>
							<Button
								size="lg"
								color="secondary"
								rounded
								className="w-36 !bg-slate-50 dark:!bg-dark-700"
								as={Link}
								to={routePaths.REGISTER}
							>
								<TextGradient
									className="font-bold uppercase"
									color="from-blue-500 to-cyan-500"
								>
									Register
								</TextGradient>
							</Button>
						</TextPanel>
					</OverlayPanel>
					<OverlayPanel placement="right" show={!isLogin}>
						<TextPanel
							title="Hello, Friend!"
							subtitle="Enter your personal details and start journey with us"
						>
							<Button
								as={Link}
								to={routePaths.LOGIN}
								size="lg"
								color="secondary"
								rounded
								className="w-36 !bg-slate-50 dark:!bg-dark-700"
							>
								<TextGradient
									className="font-bold uppercase"
									color="from-blue-500 to-cyan-500"
								>
									Log in
								</TextGradient>
							</Button>
						</TextPanel>
					</OverlayPanel>
				</OverlayContainer>
			</div>
			<Modal
				title={'Reset Password'}
				isOpen={isResetPassword}
				show={isResetPassword}
				onClose={() => setIsResetPassword(false)}
			>
				<ResetPassword
					onLogin={() => {
						setIsResetPassword(false);
					}}
				/>
			</Modal>
		</Layout>
	);
};

const OverlayContainer = ({ children, responsive, isLeft }) => {
	return (
		<div
			className={clsx(
				'absolute left-0 top-0 z-20 hidden h-full w-1/2 transform overflow-hidden transition-transform duration-700 ease-in-out sm:block ',
				responsive,
				isLeft ? 'translate-x-0' : 'translate-x-full',
			)}
		>
			<div
				className={clsx(
					'relative -left-full h-full w-[200%] translate-x-0 transform bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-700 ease-in-out dark:to-primary-700',
					isLeft ? 'translate-x-1/2' : '',
				)}
			>
				{children}
			</div>
		</div>
	);
};

const OverlayPanel = ({ children, placement, show }) => {
	const showStyle = useMemo(() => {
		if (show) {
			if (placement === 'left') {
				return 'translate-x-0';
			} else {
				return 'right-0 translate-x-0';
			}
		} else {
			if (placement === 'left') {
				return '-translate-x-[20%]';
			} else {
				return 'right-0 translate-x-[20%]';
			}
		}
	}, [show, placement]);

	return (
		<div
			className={clsx(
				'absolute top-0 h-full w-1/2 translate-x-0 transform transition-transform duration-700 ease-in-out',
				showStyle,
			)}
		>
			{children}
		</div>
	);
};

const PanelContainer = ({
	className,
	placement,
	responsive,
	active,
	children,
}) => {
	return (
		<div
			className={clsx(
				'absolute left-0 h-full transform p-4 transition-[transform_opacity] duration-700 ease-in-out',
				className,
				placement === 'right'
					? 'sm:translate-x-full'
					: 'sm:translate-x-0',
				responsive,
				active ? 'z-10 opacity-100' : 'z-0 opacity-0',
			)}
		>
			{children}
		</div>
	);
};

export default Auth;
