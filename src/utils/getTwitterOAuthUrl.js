export const TWITTER_STATE = 'state';
const TWITTER_CODE_CHALLENGE = 'challenge';
const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
const TWITTER_SCOPE = ['tweet.read', 'users.read', 'offline.access'].join(' ');

export const getTwitterOAuthUrl = (redirectUri) => {
	const url = new URL(TWITTER_AUTH_URL);
	url.searchParams.append(
		'client_id',
		process.env.REACT_APP_TWITTER_CLIENT_ID,
	);
	url.searchParams.append('redirect_uri', redirectUri);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('scope', TWITTER_SCOPE);
	url.searchParams.append('state', TWITTER_STATE);
	url.searchParams.append('code_challenge', TWITTER_CODE_CHALLENGE);
	url.searchParams.append('code_challenge_method', 'plain');

	return url.toString();
};
