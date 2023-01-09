import { Helmet } from 'react-helmet-async';

const Head = ({ title = '', description = '' }) => {
	return (
		<Helmet
			title={title ? `${title} | Nov Social` : 'Nov Social'}
			defaultTitle="Nov Social"
		>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Head;
