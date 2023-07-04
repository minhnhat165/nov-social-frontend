import Head from 'components/Head';

const Layout = ({ title, children }) => {
	return (
		<>
			<Head title={title} />
			<div className="flex h-screen w-screen items-center justify-center">
				{children}
			</div>
		</>
	);
};

export default Layout;
