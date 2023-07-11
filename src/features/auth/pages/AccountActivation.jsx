import { CheckIcon, XMarkIcon } from 'components/Icon';
import { Link, useParams } from 'react-router-dom';

import { Button } from 'components/Action';
import Layout from '../components/Layout';
import { activeAccount } from 'api/authApi';
import { routePaths } from 'routes/routeConfig';
import { useQuery } from 'react-query';
import { useState } from 'react';

const activationTypes = {
	success: {
		name: 'success',
		icon: <CheckIcon />,
		title: 'Account Activated',
		description:
			'Your account has been activated successfully. You can now login to your account.',
		button: {
			title: 'Login now',
			redirect: routePaths.LOGIN,
		},
	},
	failed: {
		name: 'failed',
		icon: <XMarkIcon />,
		title: 'Account Activation Failed',
		description:
			'Your account activation has failed. Please try again later.',
		button: {
			title: 'Try Again',
			redirect: routePaths.REGISTER,
		},
	},
};

const AccountActivation = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const { key } = useParams();
	const { isLoading } = useQuery(
		['account-activation', key],
		() => activeAccount(key),
		{
			enabled: !!key,
			onSuccess: () => setIsSuccess(true),
			onError: (error) => {
				activationTypes.failed.description = error.message;
				setIsSuccess(false);
			},
		},
	);

	return (
		<>
			{!isLoading && (
				<Layout title="Account">
					<ResultPanel
						result={
							activationTypes[isSuccess ? 'success' : 'failed']
						}
					/>
				</Layout>
			)}
		</>
	);
};

const ResultPanel = ({ result }) => {
	return (
		<div className=" my-auto flex h-fit w-full max-w-lg flex-col items-center gap-4 overflow-hidden rounded-xl bg-white p-6 text-white shadow dark:bg-dark-800">
			<div
				className={`flex h-20 w-20 items-center justify-center rounded-full border text-3xl ${
					result.name === 'success'
						? 'border-green-500 bg-green-600'
						: 'border-red-500 bg-red-500 '
				}`}
			>
				{result.icon}
			</div>
			<h3
				className={`text-2xl font-bold ${
					result.name === 'success'
						? 'text-green-600'
						: 'text-red-500'
				}`}
			>
				{result.title}
			</h3>
			<span className="text-center text-slate-900 dark:text-dark-100">
				{result.description}
			</span>

			<Button
				as={Link}
				to={result.button.redirect}
				type="button"
				variant="outlined"
				size="lg"
				rounded
			>
				<span className="text-md font-bold">{result.button.title}</span>
			</Button>
		</div>
	);
};

export default AccountActivation;
