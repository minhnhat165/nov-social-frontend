import { useState } from 'react';
import Button from '../../../components/Action/Button/ButtonV2';

const DialogBoxContent = ({ content, onClose }) => {
	const [currentSpeech, setCurrentSpeech] = useState(0);
	return (
		<div className="w-[80vw] rounded-xl bg-white p-2 text-blue-900 shadow">
			<span>{content[currentSpeech]}</span>
			<div className="mt-2 flex justify-end gap-1">
				{currentSpeech === content.length - 1 ? (
					<Button
						onClick={onClose}
						size="small"
						color="bg-blue-400/20 text-blue-500"
					>
						Đóng
					</Button>
				) : (
					<Button
						onClick={() => {
							setCurrentSpeech((prev) => ++prev);
						}}
						size="small"
						color="bg-blue-400/20 text-blue-500"
					>
						Tiếp
					</Button>
				)}
			</div>
		</div>
	);
};

export default DialogBoxContent;
