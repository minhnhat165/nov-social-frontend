import { FacebookIcon, GoogleIcon, TwitterIcon } from 'components/Icon';

import { FACEBOOK_APP_ID } from 'configs';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import IconButton from 'components/Action/IconButton';
import { useGoogleLogin } from '@react-oauth/google';

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
			<div
				className="flex list-none justify-evenly"
				style={{ paddingLeft: 0, marginTop: 4, marginBottom: 4 }}
			>
				<IconButton
					color="secondary"
					size="md"
					onClick={responseGoogle}
				>
					<GoogleIcon />
				</IconButton>

				<FacebookLogin
					appId={FACEBOOK_APP_ID}
					autoLoad={false}
					fields="name,email,picture"
					callback={responseFacebook}
					render={(renderProps) => (
						<IconButton
							onClick={renderProps.onClick}
							color="secondary"
							size="md"
						>
							<FacebookIcon className="h-8 w-8" />
						</IconButton>
					)}
				/>

				<IconButton color="secondary">
					<TwitterIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default SocialLogin;
