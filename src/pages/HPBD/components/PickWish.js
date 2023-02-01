import React, { useMemo, useState } from 'react';
import Button from '../../../components/ButtonOld/ButtonV2';
import Modal from '../../../components/OverLay/Modal';

const PickWish = ({ setStep, setShow }) => {
	const [showModal, setShowModal] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [currentContentId, setCurrentContentId] = useState(0);

	const [countNotAgreed, setCountNotAgreed] = useState(0);
	const wishList = useMemo(() => {
		const wishList = [
			{
				id: 0,
				title: 'Điều ước thứ một',
				text: 'Được làm bạn gái anh Nhật',
			},
			{
				id: 1,
				title: 'Điều ước thứ hai',

				text: 'Anh Nhât làm bạn trai Lê',
			},
			{
				id: 2,
				title: 'Điều ước thứ ba',
				text: 'Điều ước thứ một + điều ước thứ 2 = điều ước thứ 3',
			},
			{
				id: 3,
				title: 'Duyệt',
				style: 'bg-pink-500 text-white',
				text: 'Hihihi duyệt nha duyệt nha, hỏng được hối hận đâu á, vì lựa chọn này tặng bé luôn 3 điều ước đã điền trước đó. Ấn tiếp đê tiếp 🙂',
			},
			{
				id: 4,
				title: 'Không duyệt',
				style: 'bg-slate-400 text-white',
				text: 'Thức dọng, quá thức dọng, con tim vỡ tan, gối ơiiiiiiiiiiiiiii. Nhưng mà hong được đâu bé ơi phải duyệt á, không duyệt là không qua cửa này đâu :)))',
			},
		];

		if (countNotAgreed === 1) {
			wishList[3].text =
				'Bé đã được nhận 3 điều ước đã điền trước đó chứ không phải 3 điều ước này nên đừng lo. Đó là nếu trước đó phải phải là "không duyệt" 🙂. Bé làm anh đau, anh dỗi 😤. Ấn tiếp đê bé, không có lựa chọn khác đâu 🙂';
		}

		if (countNotAgreed > 1) {
			wishList[4].text =
				'Cái gì, còn quay lại nhấn không duyệt nữa hả, tường ơiiiiiiiiiiiiiiiiiiiiiii, tao tới đây. Bấm duyệt đi mà, không có sự lựa chọn khác đâu';
			wishList[3].text =
				'Ấn tiếp đi bé, không ấn là không tiếp tục được đâu 😏';
		}
		if (countNotAgreed > 2) {
			wishList[4].text = `Trời ơi duyệt đi màaaaaaaa, lần thứ ${countNotAgreed} rồi đó, tim đau ${countNotAgreed} X 1000`;
		}
		return wishList;
	}, [countNotAgreed]);

	return (
		<>
			<Button
				fullWidth
				rounded
				animation
				color="bg-white text-pink-400 shadow-pink-500 shadow"
				onClick={() => {
					setShowModal(true);
					setStep(5);
				}}
			>
				Kiểm tra điều ước
			</Button>
			<Modal show={showModal}>
				<div className="relative flex h-screen w-screen items-center justify-center px-4 md:h-[667px] md:w-[375px]">
					<div className="flex w-full flex-col gap-4">
						{wishList.map((wish) => (
							<Button
								key={wish.id}
								color={`${
									wish.style
										? wish.style
										: 'text-white bg-white text-pink-400 shadow-pink-500 shadow'
								} `}
								fullWidth
								rounded
								onClick={() => {
									setShowContent(true);
									setCurrentContentId(wish.id);
									if (wish.id === 4)
										setCountNotAgreed((prev) => ++prev);
								}}
							>
								{wish.title}
							</Button>
						))}
					</div>
				</div>

				<Modal
					show={showContent}
					setShow={setShowContent}
					hideCloseButton
				>
					<div className="w-screen p-4 sm:w-[375px]">
						<div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl bg-white p-4">
							<div
								onClick={() => setShowContent(false)}
								className="cursor-pointer rounded-xl bg-pink-200/50 px-8 py-2 text-center text-pink-500 active:bg-pink-200"
							>
								<div>{wishList[currentContentId].text}</div>
							</div>
							{currentContentId === 3 && (
								<Button
									size="small"
									onClick={() => {
										setShowModal(false);
										setShow(false);
										if (countNotAgreed > 0) setStep(6);
										else setStep(7);
									}}
									color="bg-pink-200/50 text-pink-500 mt-4 active:bg-pink-200"
								>
									Tiếp
								</Button>
							)}
						</div>
					</div>
				</Modal>
			</Modal>
		</>
	);
};

export default PickWish;
