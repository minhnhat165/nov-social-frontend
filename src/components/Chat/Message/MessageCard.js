import { useState } from 'react';
import Img from '../../../components/Img';
import ConfirmBox from '../../ConfirmBox';
import { useMessage } from './MessageContext';
import MessageMenu from './MessageMenu';
import { motion } from 'framer-motion';

const MessageCard = ({ message, borderRadiusStyle, isUser }) => {
	const [showConfirmBox, setShowConfirmBox] = useState(false);

	const { handleDeleteMessage: onDeleteMessage } = useMessage();

	const handleDeleteMessage = () => {
		setShowConfirmBox(false);
		onDeleteMessage(message);
	};
	return (
		<>
			<motion.div
				layout
				initial={{ opacity: 0, scale: 0.4 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.4, height: 0 }}
				transition={{
					opacity: { duration: 0.2 },
					layout: {
						type: 'spring',
						bounce: 0.4,
					},
				}}
				style={{ originX: isUser ? 1 : 0 }}
				key={message._id}
				className={`group relative flex w-full break-all ${
					isUser ? 'justify-end md:pl-[30%]' : 'justify-start md:pr-[30%]'
				}`}
			>
				<div className={`relative flex max-w-full`}>
					{isUser && (
						<MessageMenu
							message={message}
							onDelete={() => setShowConfirmBox(true)}
						/>
					)}
					<div
						className={`relative rounded-xl text-start ${
							isUser ? 'bg-primary-bold' : 'bg-dark-semiBold'
						} group overflow-hidden ${borderRadiusStyle}`}
					>
						{message.text && (
							<span className="inline-block w-full break-words p-2 px-4 text-dark-text-bold">
								{message.text}
							</span>
						)}

						{message.image && (
							<div
								className={`rounded-xl ${borderRadiusStyle} overflow-hidden`}
							>
								<Img
									src={message.image}
									className="max-w-[200px] object-cover"
									clickAble
								/>
							</div>
						)}
					</div>
					{!isUser && (
						<MessageMenu
							message={message}
							onDelete={() => setShowConfirmBox(true)}
						/>
					)}
				</div>
			</motion.div>
			<ConfirmBox
				show={showConfirmBox}
				setShow={setShowConfirmBox}
				onConfirm={handleDeleteMessage}
				header={
					<span>
						Remove your <span className="text-primary">Message</span> ?
					</span>
				}
				content={
					'This message will be unsent for everyone in the chat. Others may have already seen or forwarded it. Unsent messages can still be included in reports.'
				}
				buttonText={'Remove'}
			/>
		</>
	);
};
export default MessageCard;
