import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Head = ({ title = '', description = '' }) => {
	const notificationsCount = useSelector(
		(state) => state.auth.user?.notificationsCount
	);
	return (
		<Helmet
			title={
				title
					? `${
							notificationsCount > 0
								? `(${notificationsCount})`
								: ''
					  } ${title} | Nov Social`
					: 'Nov Social'
			}
			defaultTitle="Nov Social"
		>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Head;
