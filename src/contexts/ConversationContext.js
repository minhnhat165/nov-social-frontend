import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	addMember,
	changeGroupChatAvatar,
	deleteConversation,
	leaveGroupChat,
	removeMember,
	renameGroupChat,
} from '../api/chatApi';
import GroupChatAddMember from '../components/Chat/GroupChatComponents/GroupChatAddMember';
import GroupChatRename from '../components/Chat/GroupChatComponents/GroupChatRename';
import GroupChatUpLoadAvatar from '../components/Chat/GroupChatComponents/GroupChatUpLoadAvatar';
import ConfirmBox from '../components/ConfirmBox';
import Modal from '../components/OverLay/Modal';
import { useAsyncFn } from '../hooks/useAsync';
import {
	removeConversation,
	updateConversations,
} from '../redux/slices/chatSlice';

const Context = createContext();
export function useConversation() {
	return useContext(Context);
}
const ConversationProvider = ({ children, initialConversation }) => {
	const dispatch = useDispatch();
	const socket = useSelector((state) => state.socket.socket);
	const navigate = useNavigate();

	const currentUserId = useSelector((state) => state.auth.user._id);
	const addMemberFn = useAsyncFn(addMember);
	const removeMemberFn = useAsyncFn(removeMember);
	const renameGroupChatFn = useAsyncFn(renameGroupChat);
	const changeGroupChatAvatarFn = useAsyncFn(changeGroupChatAvatar);
	const deleteConversationFn = useAsyncFn(deleteConversation);
	const leaveGroupChatFn = useAsyncFn(leaveGroupChat);

	const handleDeleteConversation = (conversationId) => {
		deleteConversationFn.execute(conversationId).then(() => {
			dispatch(removeConversation(conversationId));
			navigate('/chat');
		});
	};

	const [conversation, setConversation] = useState(initialConversation);
	const [showConfirmBox, setShowConfirmBox] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState();
	const [confirmBox, setConfirmBox] = useState({
		header: '',
		children: '',
		onConfirm: () => {},
		buttonText: '',
	});

	useEffect(() => {
		setConversation(initialConversation);
	}, [initialConversation]);

	//convert to render
	const conversationConverted = useMemo(() => {
		if (!conversation) return;
		if (conversation.name === 'default') {
			let guest = conversation.users.find(
				(user) => user._id !== currentUserId
			);
			if (!guest) guest = conversation.users[0];
			return { ...conversation, name: guest.name, avatar: guest.avatar };
		}
		return conversation;
	}, [conversation, currentUserId]);

	const handleRenameGroup = async (newGroupName) => {
		renameGroupChatFn
			.execute(conversation._id, newGroupName)
			.then((newConversation) => {
				setConversation(newConversation);
				dispatch(updateConversations(newConversation));
				socket.emit('send message', newConversation);
			});
	};

	const handleLeaveGroup = (conversationId) => {
		leaveGroupChatFn.execute(conversationId).then(() => {
			dispatch(removeConversation(conversationId));
			navigate('/chat');
		});
	};

	const handleChangeGroupAvatar = (avatarFile) => {
		const formData = new FormData();
		formData.append('conversationId', conversation._id);
		formData.append('avatar', avatarFile);
		changeGroupChatAvatarFn.execute(formData).then((newConversation) => {
			setConversation(newConversation);
			dispatch(updateConversations(newConversation));
			socket.emit('send message', newConversation);
		});
	};

	const handleRemoveMember = (memberId) => {
		if (!removeMemberFn.loading) {
			removeMemberFn
				.execute(conversation._id, memberId)
				.then((newConversation) => {
					setConversation(newConversation);
					dispatch(updateConversations(newConversation));
					socket.emit('send message', newConversation);
				});
		}
	};

	const handleAddMember = async (users) => {
		if (!addMemberFn.loading) {
			const data = {
				conversationId: conversation._id,
				users: JSON.stringify(users.map((user) => user._id)),
			};

			addMemberFn.execute(data).then((newConversation) => {
				setConversation(newConversation);
				dispatch(updateConversations(newConversation));
				socket.emit('send message', newConversation);
			});
		}
		setShowModal(false);
	};

	const callModalAddMember = () => {
		setShowModal(true);
		setModalContent(
			<GroupChatAddMember
				conversation={conversation}
				onCancel={() => setShowModal(false)}
				onSubmit={handleAddMember}
			/>
		);
	};

	const actionDeleteConversation = () => {
		setShowConfirmBox(true);
		setConfirmBox({
			header: (
				<span>
					Delete your <span className="text-primary">Chat</span> ?
				</span>
			),
			children:
				'Once you leave your copy of this conversation, it cannot be undone.',
			onConfirm: () => {
				setShowConfirmBox(false);
				handleDeleteConversation(conversation._id);
			},
			buttonText: 'Delete',
		});
	};

	const actionRenameChat = () => {
		setShowModal(true);
		setModalContent(
			<GroupChatRename
				onCancel={() => setShowModal(false)}
				onSubmit={() => setShowModal(false)}
			/>
		);
	};

	const actionLeaveGroup = () => {
		setShowConfirmBox(true);
		setConfirmBox({
			header: (
				<span>
					Leave group <span className="text-primary">Chat</span> ?
				</span>
			),
			children:
				'Once you leave your copy of this conversation, it cannot be undone.',
			onConfirm: () => {
				setShowConfirmBox(false);
				handleLeaveGroup(conversation._id);
			},
			buttonText: 'Leave',
		});
	};

	const actionChangeGroupAvatar = () => {
		setShowModal(true);
		setModalContent(
			<GroupChatUpLoadAvatar
				conversation={conversation}
				onCancel={() => setShowModal(false)}
				onSubmit={(avatarFile) => {
					handleChangeGroupAvatar(avatarFile);
					setShowModal(false);
				}}
			/>
		);
	};

	return (
		<Context.Provider
			value={{
				conversation: conversationConverted,
				setConversation,
				handleRenameGroup,
				handleRemoveMember,
				handleAddMember,
				callModalAddMember,
				actionDeleteConversation,
				actionLeaveGroup,
				actionRenameChat,
				actionChangeGroupAvatar,
			}}
		>
			{children}
			<ConfirmBox
				show={showConfirmBox}
				setShow={setShowConfirmBox}
				onConfirm={confirmBox.onConfirm}
				header={confirmBox.header}
				buttonText={confirmBox.buttonText}
			>
				{confirmBox.children}
			</ConfirmBox>
			<Modal show={showModal} setShow={setShowModal}>
				{modalContent}
			</Modal>
		</Context.Provider>
	);
};

export default ConversationProvider;
