import React, { useState } from 'react';
import { createGroupChat } from '../../../api/chatApi';
import { useChat } from '../../../contexts/ChatContext';
import { useAsyncFn } from '../../../hooks/useAsync';
import Modal from '../../Modal';
import GroupChatCreateForm from './GroupChatCreateFrom';

const GroupChatCreate = ({ children: Button }) => {
	const [showForm, setShowForm] = useState(false);
	const createGroupChatFn = useAsyncFn(createGroupChat);
	const { handleCreateLocalGroupChat } = useChat();
	const handleGroupChat = (data) => {
		createGroupChatFn.execute(data).then((newConversation) => {
			setShowForm(false);
			handleCreateLocalGroupChat(newConversation);
		});
	};
	return (
		<>
			<div onClick={() => setShowForm(true)}>{Button}</div>
			<Modal show={showForm} setShow={setShowForm}>
				<GroupChatCreateForm
					loading={createGroupChatFn.loading}
					onSubmit={handleGroupChat}
				/>
			</Modal>
		</>
	);
};

export default GroupChatCreate;
