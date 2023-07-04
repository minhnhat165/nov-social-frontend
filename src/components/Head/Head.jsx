import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Head = ({ title = '', description = '' }) => {
	const numNotifications = useSelector(
		(state) => state.auth.user?.numNotifications,
	);
	return (
		<Helmet
			title={
				`${numNotifications > 0 ? `(${numNotifications}) ` : ''}` +
				(title ? `${title} | Nov Social` : 'Nov Social')
			}
			defaultTitle="Nov Social"
		>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Head;
