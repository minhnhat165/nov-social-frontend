import React, { useMemo, useState } from 'react';
import Button from '../../../components/ButtonOld/ButtonV2';
import Modal from '../../../components/Modal';
import TextArea from '../../../components/TextArea';
import FallingStar from './FallingStar';
const WishContainer = ({ onSubmitWish }) => {
	const [showModal, setShowModal] = useState(false);
	const [currentWishId, setCurrentWishId] = useState(0);

	const [wishList, setWishList] = useState([
		{ id: 0, title: 'Điều ước thứ một', text: '' },
		{ id: 1, title: 'Điều ước thứ hai', text: '' },
		{ id: 2, title: 'Điều ước thứ ba', text: '' },
	]);

	const onEnter = (value, id) => {
		setShowModal(false);
		setWishList((prev) =>
			prev.map((wish) => {
				if (wish.id === id) return { ...wish, text: value };
				return wish;
			})
		);
	};

	const onChange = (value, id) => {
		setWishList((prev) =>
			prev.map((wish) => {
				if (wish.id === id) return { ...wish, text: value };
				return wish;
			})
		);
	};

	const isValid = useMemo(() => {
		let isValid = true;
		wishList.forEach((wish) => {
			if (!wish.text.trim()) isValid = false;
		});
		return isValid;
	}, [wishList]);

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center p-4 sm:h-[667px] sm:w-[375px]">
			<FallingStar />
			<div className="relative flex w-full flex-col gap-4">
				{wishList.map((wish) => {
					const isActive = wishList[wish.id].text.trim();
					return (
						<Button
							key={wish.id}
							fullWidth
							rounded
							color={`bg-white  ${
								isActive
									? 'shadow-pink-500 shadow text-pink-400'
									: ''
							}`}
							onClick={() => {
								setShowModal(true);
								setCurrentWishId(wish.id);
							}}
						>
							{wish.title}
							{isActive && (
								<i className="fa-duotone fa-badge-check absolute right-10 text-pink-500"></i>
							)}
						</Button>
					);
				})}

				<Button
					disabled={!isValid}
					onClick={() => onSubmitWish(wishList)}
					fullWidth
					rounded
					color="bg-pink-500 text-white"
				>
					Chốt đơn
				</Button>
			</div>
			<Modal show={showModal} setShow={setShowModal}>
				<div className="relative w-screen p-4 sm:w-[375px]">
					<div className="flex min-h-[208px] w-full flex-col rounded-xl bg-white p-4">
						<TextArea
							onChange={(value) => {
								onChange(value, currentWishId);
							}}
							onEnter={(value) => {
								onEnter(value, currentWishId);
							}}
							autoFocus
							value={wishList[currentWishId].text}
						/>
						<div className="mt-auto ml-auto">
							<Button
								animation
								size="medium-small"
								onClick={() => setShowModal(false)}
								color="bg-pink-200/50 text-pink-500"
							>
								Ok
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default WishContainer;
