import Layer from 'components/Layout/Layer';
import Layout from '../components/Layout';
import PostEditor from 'features/post/components/PostEditor';

const Home = () => {
	return (
		<Layout>
			<div className="mx-auto flex max-w-[600px] flex-col pt-2">
				<div>
					<PostEditor />
				</div>
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
