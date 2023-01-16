import { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/ButtonOld/ButtonV2';
import Popover from '../../../components/Popover';

const speeches = {
	0: [
		'Xin chào, là anh IT đẹp trai cute phô mai que đây 😘 !!!',
		'Nhận được tín hiệu từ vũ trụ 🌌, tới sinh nhật cô gái ấy rồi...,',
		'Nên anh trai IT xin làm mình làm mẩy làm ra luôn cái mini game này, với mong muốn làm tốn thời gian của cô gái ấy...',
		'Kế bên là nút bật nhạc, ấn vô để nghe nhạc trong lúc chờ đồng hồ đếm xong...',
	],

	1: [
		'Đồng hồ đã điểm, giờ vàng đã đến...',
		'Chúc mừng sinh nhật Trần Thị Quỳnh Lê , hú hú 🥳',
		'Hãy ấn vào bánh kem 🎂 trong vòng tròn, số lần nhấn bằng với số tuổi của bạn 👆',
	],
	2: [
		'Những cú click vừa rồi tạm gọi là thổi nến 🕯️, tiếp theo là unbox quà 🎁...',
		'Ấn vào hộp quà để mở 👆',
	],

	3: [
		'Đây là tiết mục ước nguyện đêm khuya...',
		'Vì khoảng cách địa lý chia rẽ đôi ta, để thằng Quý nó có cơ hội hành động 🙂...',
		'Nên thay vì một điều ước, bé sẽ có 3 điều ước 🌠, bất ngờ chưa...',
		'Ấn vào từng điều ước 👆 và nhập điều ước vào 🌠, sao khi nhập đủ cả 3, ấn nút "chốt đơn" để gửi điều ước này đến anh IT đẹp trai cute phô mai que...',
		'Nếu anh trai ấy mà thấy 3 điều ước hợp lý thì thực hiện, không hợp lý cũng thực hiện luôn 👌',
		'Không dài dòng nữa, bấm vào điều ước và nhập ước nguyện của mình nào!!!',
	],
	4: [
		'Để cho chắc ăn thì vui lòng ấn vào "Kiểm tra điều ước" 👆 xem bản thân đã điền hợp lý hay chưa.',
	],
	5: [
		'Nếu nhận thấy điều ước nào không hợp lý hãy ấn không duyệt để trở lại chỉnh sửa, nếu tất cả đều perfect thì duyệt vội',
	],
	6: [
		'Đùa tí thôi chứ anh IT đẹp trai cute phô mai que đã lưu 3 điều ước đó rồi nha',
	],
	7: [
		'Có thể anh chưa thực hiện được ngay lập tức nhưng sẽ cố gắng thực hiện hết...',
		'Vì đây là sản phẩm viết hơi vội nên sẽ có sai sót mong bé thông cảm, hỏng thông cảm thì thoi, kệ...',
		'Cuối cùng...',
		'Chúc Trần Thị Quỳnh Lê, tuổi mới đạt được nhiều thành công, cầu tài được tài, cầu tiền được tiền, cầu tình được tình (mà phải với anh Nhật mới dc), cầu gì được nấy..., hạp bì bớt đề tú du, hạp bì bớt đề tú du',
	],
};

const DialogBox = ({ step = 0, setEnd }) => {
	const [visible, setVisible] = useState(true);
	const [currentSceneId, setCurrentSceneId] = useState(0);
	const [scenes, setScenes] = useState([]);

	useEffect(() => {
		setScenes((prev) => [...prev, ...speeches[step]]);
		if (step === 6) setScenes((prev) => [...prev, ...speeches[7]]);
		if (!visible) {
			setVisible(true);
			setCurrentSceneId((prev) => ++prev);
		}
	}, [step]);

	const render = useMemo(() => {
		return (
			<Popover
				visible={visible}
				setVisible={setVisible}
				hideOnClickParent
				placement="top"
				render={
					<div className="w-[80vw] rounded-xl bg-white p-2 text-blue-900 shadow md:max-w-[300px]">
						<span>{scenes[currentSceneId]}</span>
						<div className="mt-2 flex justify-end gap-1">
							{currentSceneId === scenes.length - 1 ? (
								<Button
									onClick={() => {
										setVisible(false);
										if (step === 7 || step === 6)
											setEnd(true);
									}}
									size="small"
									color="bg-blue-400/20 text-blue-500"
								>
									Đóng
								</Button>
							) : (
								<Button
									onClick={() => {
										setCurrentSceneId((prev) => ++prev);
									}}
									size="small"
									color="bg-blue-400/20 text-blue-500"
								>
									Tiếp
								</Button>
							)}
						</div>
					</div>
				}
			>
				<Button
					rounded
					color="bg-white text-blue-400"
					className="shadow-md shadow-blue-300"
					centerIcon={<i className="fa-solid fa-comment-dots"></i>}
				/>
			</Popover>
		);
	}, [currentSceneId, scenes, setEnd, step, visible]);

	return <>{render}</>;
};

export default DialogBox;
