import Layer from 'components/Layout/Layer';
import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
	return (
		<Layout>
			<div className="mx-auto flex max-w-[600px] flex-col pt-2">
				<Layer className="mb-4 h-14 w-full rounded-xl bg-slate-50 shadow-md"></Layer>
				<div className="flex flex-col gap-4">
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
