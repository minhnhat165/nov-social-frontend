import { APP_NAME } from 'configs';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Head = ({ title = '', description = '', image = ' ' }) => {
	const numNotifications = useSelector(
		(state) => state.auth.user?.numNotifications,
	);
	return (
		<Helmet
			title={
				`${numNotifications > 0 ? `(${numNotifications}) ` : ''}` +
				(title ? `${title} | ${APP_NAME}` : `${APP_NAME}`)
			}
			defaultTitle={APP_NAME}
		>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={image} />
		</Helmet>
	);
};
export default Head;
