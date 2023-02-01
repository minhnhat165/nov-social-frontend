import Avatar from 'components/DataDisplay/Avatar';
import Card from 'components/DataDisplay/Card';
import Intro from 'features/user/components/Intro';
import Layer from 'components/Layout/Layer';
import ReactStickyBox from 'react-sticky-box';

const PostPage = () => {
	return (
		<div className="flex h-full items-start pt-2">
			<ReactStickyBox
				offsetTop={72}
				offsetBottom={8}
				className="max-w-96 mx-2 w-1/3"
			>
				<div className="flex h-full w-full flex-col gap-y-4 pt-2">
					<Intro />
					<Card className="w-full">
						<Card.Title>Following</Card.Title>
						<Card.Body>
							<Avatar.Group>
								<Avatar src="https://res-console.cloudinary.com/devemail/thumbnails/v1/image/upload/v1674925164/YXZhdGFyL2NzdG0xdW1xcmZobmRpbXhmOHhi" />
								<Avatar src="https://res.cloudinary.com/devemail/image/upload/v1674929626/avatar/t6pqhg8ue4jsrbv0efq1.jpg" />
								<Avatar src="https://i.pravatar.cc/300" />
								<Avatar src="https://i.pravatar.cc/500" />
							</Avatar.Group>
						</Card.Body>
					</Card>
					<Card className="w-full">
						<Card.Title>Photos</Card.Title>
						<Card.Body>
							<div className="grid grid-cols-3 gap-1 overflow-hidden rounded-xl">
								<div className="aspect-square w-full shadow">
									<img
										src="https://picsum.photos/200"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="aspect-square w-full  shadow">
									<img
										src="https://picsum.photos/200"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="aspect-square w-full shadow">
									<img
										src="https://picsum.photos/200"
										alt=""
										className="h-full w-full  object-cover"
									/>
								</div>
								<div className="aspect-square w-full shadow">
									<img
										src="https://picsum.photos/200"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</ReactStickyBox>
			<div className="flex max-w-[600px] flex-1 flex-col px-2">
				<Layer className="mb-4 h-14 w-full rounded-xl bg-slate-50 shadow-md"></Layer>
				<div className="flex flex-col gap-4">
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
					<Layer className="h-96 w-full rounded-xl shadow"></Layer>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
