import { Card, Chip, FullViewImage, Img } from 'components/DataDisplay';
import { PencilIcon, PlusIcon } from 'components/Icon';

import { Button } from 'components/Action';
import { Details } from 'features/user/components';
import InterestEditor from 'features/Interest/Components/InterestEditor';
import Layer from 'components/Layout/Layer';
import { Modal } from 'components/OverLay';
import ReactStickyBox from 'react-sticky-box';
import { useModal } from 'hooks/useModal';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostPage = () => {
	const { isOwner } = useOutletContext();

	return (
		<div className="flex h-full items-start">
			<ReactStickyBox
				offsetTop={8}
				offsetBottom={8}
				className="max-w-96 mx-2 w-1/3"
			>
				<div className="flex h-full w-full flex-col gap-y-4 pt-2">
					<Details isOwner={isOwner} />
					<Interests isOwner={isOwner} />
					<Photos />
				</div>
			</ReactStickyBox>
			<div className="flex max-w-[600px] flex-1 flex-col px-2 py-4">
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

function Interests({ isOwner }) {
	const interests = useSelector((state) => state.profile.data.interests);
	const { isOpen, close, open } = useModal();
	const renderAction = (interests) => {
		const isEmpty = !interests?.length;
		return (
			<>
				<Button
					onClick={open}
					rounded
					color="secondary"
					startIcon={isEmpty ? <PlusIcon /> : <PencilIcon />}
					size="sm"
				>
					{isEmpty ? 'Add' : 'Edit'}
				</Button>

				<Modal open={isOpen} onClose={close}>
					<InterestEditor
						defaultSelected={interests}
						onCancel={close}
					/>
				</Modal>
			</>
		);
	};

	return (
		<Card className="w-full ">
			<Card.Header className="flex items-center justify-between">
				<Card.Title>Interest</Card.Title>
				{isOwner && renderAction(interests)}
			</Card.Header>
			{interests?.length > 0 && (
				<Card.Body className="pb-4 pt-2 ">
					<div className="-m-1">
						{interests.map((interest) => (
							<Chip
								icon={interest.icon}
								key={interest._id}
								className="m-1"
							>
								{interest.name}
							</Chip>
						))}
					</div>
				</Card.Body>
			)}
		</Card>
	);
}

function Photos() {
	const photos = useSelector((state) => state.profile.data.photos) || [];
	return (
		photos.length > 0 && (
			<Card className="w-full">
				<Card.Header>
					<Card.Title>Photos</Card.Title>
				</Card.Header>
				<Card.Body className="pb-4">
					<div className="grid grid-cols-3 gap-1 overflow-hidden">
						{photos.map((photo, index) => (
							<div
								key={index}
								className="aspect-square w-full overflow-hidden rounded-xl shadow"
							>
								<FullViewImage src={photo}>
									<Img
										src={photo}
										alt=""
										className="h-full w-full object-cover"
									/>
								</FullViewImage>
							</div>
						))}
					</div>
				</Card.Body>
			</Card>
		)
	);
}
