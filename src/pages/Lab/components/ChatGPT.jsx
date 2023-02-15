import React, { forwardRef, useEffect, useRef, useState } from 'react';

import Avatar from 'components/DataDisplay/Avatar';
import Card from 'components/DataDisplay/Card';
import IconWrapper from 'components/Icon/IconWrapper';
import { PaperAirplaneIcon } from 'components/Icon';
import Text from 'components/Typography/Text';
import openai from 'configs/openAiConfig';
import { useSelector } from 'react-redux';

const ChatGPT = () => {
	const avatar = useSelector((state) => state.auth.user.avatar);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	};
	const [messages, setMessages] = useState([]);
	const handleSubmit = (message) => {
		createMessage(message, 'user');
		generateText(message);
	};
	const createMessage = (message, sender) => {
		const newMessage = {
			message,
			sender,
		};
		setMessages((prev) => [...prev, newMessage]);
		scrollToBottom();
	};

	const generateText = async (prompt) => {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: prompt,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});
		createMessage(response.data.choices[0].text, 'bot');
	};
	return (
		<Card className="w-[480px]">
			<Text className="flex h-14 items-center justify-center rounded-t-xl bg-dark-bold2 text-center text-xl">
				Chat GPT Fake
			</Text>
			<div level={2} className="h-96 w-full overflow-y-scroll py-4">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`mt-4 flex  ${
							message.sender === 'user'
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<div
							className={`flex max-w-[90%] items-start ${
								message.sender === 'user'
									? 'flex-row-reverse'
									: ''
							}`}
						>
							<Avatar
								src={message.sender === 'user' ? avatar : null}
								alt={message.sender === 'user' ? 'User' : 'A I'}
								className="mx-2"
							/>
							<div
								className={`break-keep rounded-xl p-2 ${
									message.sender === 'user'
										? 'bg-primary-500'
										: 'bg-dark-600'
								}`}
							>
								{message.message}
							</div>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<Input onSubmit={handleSubmit} />
		</Card>
	);
};

export default ChatGPT;

const Input = ({ onSubmit }) => {
	const [prompt, setPrompt] = useState('');
	const inputRef = useRef(null);
	const [isValid, setIsValid] = useState(false);

	const handleSubmit = () => {
		if (!isValid) return;
		onSubmit(prompt);
		setPrompt('');
		inputRef.current.focus();
	};

	useEffect(() => {
		if (prompt.trim().length > 0) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [prompt]);

	return (
		<div className="flex overflow-hidden rounded-b-xl bg-dark-bold2">
			<input
				ref={inputRef}
				value={prompt}
				className="text-normal w-full  bg-transparent px-4 focus:outline-none"
				onChange={(e) => setPrompt(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSubmit();
					}
				}}
			></input>
			<button
				className="flex h-12 w-20 cursor-pointer items-center justify-center text-primary-500 disabled:text-dark-500"
				onClick={handleSubmit}
				disabled={!isValid}
			>
				<IconWrapper>
					<PaperAirplaneIcon className="" />
				</IconWrapper>
			</button>
		</div>
	);
};
