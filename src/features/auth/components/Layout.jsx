import Head from 'components/Head';
import SettingBar from 'components/SettingBar';

const Layout = ({ title, children }) => {
	return (
		<>
			<Head title={title} />
			<div className="flex h-screen w-screen justify-center pt-[72px]">
				<div className="fixed right-0 top-2">
					<SettingBar />
				</div>
				{children}
			</div>
		</>
	);
};

export default Layout;
