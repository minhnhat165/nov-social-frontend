import Head from 'components/Head';
import Layer from 'components/Layout/Layer';

const Layout = ({ children }) => {
	return (
		<div className="flex h-screen w-full overflow-y-scroll">
			<Head />
			<aside className="hidden h-full p-2 py-4 transition-all tablet:flex ">
				<Layer className="top-0 h-96 w-80 rounded-xl shadow" />
			</aside>
			<main className="flex-1">{children}</main>
			<aside className="hidden h-full p-2 py-4 laptop:block">
				<Layer className="h-96 w-80 rounded-xl"></Layer>
			</aside>
		</div>
	);
};

export default Layout;
