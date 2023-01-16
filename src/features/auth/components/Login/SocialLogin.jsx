import { useGoogleLogin } from '@react-oauth/google';
import { FacebookIcon, GoogleIcon, TwitterIcon } from 'components/Icon';
import IconButton from 'components/IconButton';
import { FACEBOOK_APP_ID } from 'configs';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const SocialLogin = ({ onLogin }) => {
	const responseGoogle = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			onLogin({
				provider: 'google',
				token: tokenResponse.access_token,
			});
		},
	});

	const responseFacebook = (response) => {
		onLogin({
			provider: 'facebook',
			token: response.accessToken,
		});
	};

	return (
		<div className="w-full">
			<ul
				className="flex list-none justify-evenly"
				style={{ paddingLeft: 0, marginTop: 4, marginBottom: 4 }}
			>
				<li>
					<IconButton
						color="light"
						size="md"
						className="border border-gray-200 dark:border-none"
						onClick={responseGoogle}
					>
						<GoogleIcon />
					</IconButton>
				</li>
				<li>
					<FacebookLogin
						appId={FACEBOOK_APP_ID}
						autoLoad={false}
						fields="name,email,picture"
						callback={responseFacebook}
						render={(renderProps) => (
							<IconButton
								onClick={renderProps.onClick}
								color="light"
								size="md"
								className="border border-gray-200 dark:border-none"
							>
								<FacebookIcon />
							</IconButton>
						)}
					/>
				</li>
				<li>
					<IconButton
						color="light"
						size="md"
						className="border border-gray-200 dark:border-none"
					>
						<TwitterIcon />
					</IconButton>
				</li>
			</ul>
		</div>
	);
};

export default SocialLogin;
