import Head from 'components/Head';
import Layer from 'components/Layout/Layer';

const Layout = ({ children }) => {
	return (
		<div className="flex w-full">
			<Head title="Home" />
			<aside className="hidden h-full p-2 pt-20 transition-all tablet:flex ">
				<div className="hidden w-16 desktop:block"></div>
				<Layer className="top-0 h-96 w-80 rounded-xl shadow" />
			</aside>
			<main className="flex-1">{children}</main>
			<aside className="hidden h-full p-2 pt-20 laptop:block">
				<Layer className="h-96 w-80 rounded-xl"></Layer>
			</aside>
		</div>
	);
};

export default Layout;
