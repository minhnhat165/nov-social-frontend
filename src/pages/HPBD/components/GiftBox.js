import React, { useState } from 'react';
import Button from '../../../components/ButtonOld';
import Modal from '../../../components/Modal';
import LottieGiftBoxIcon from '../../../components/Icon/LottieGiftBox';
import WishContainer from './WishContainer';

const GiftBox = ({ onSubmit, setStep }) => {
	const [openGift, setOpenGift] = useState(false);
	return (
		<>
			<Button
				onClick={() => {
					setOpenGift(true);
					setTimeout(() => {
						setStep(3);
					}, 1500);
				}}
				className="background-transparent"
			>
				<LottieGiftBoxIcon />
			</Button>
			<Modal show={openGift} setShow={setOpenGift}>
				<WishContainer
					onSubmitWish={(data) => {
						setOpenGift(false);
						onSubmit(data);
					}}
				/>
			</Modal>
		</>
	);
};

export default GiftBox;
