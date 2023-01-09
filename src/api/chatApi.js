// import { axiosClientPrivate, setHeader } from 'configs/axiosConfig';

// const URL = 'chat/';

// const accessConversation = (id) =>
// 	axiosClientPrivate.get(URL + `access/${id}`, {
// 		headers: setHeader(),
// 	});

// const getConversations = () =>
// 	axiosClientPrivate.get(URL + `conversations`, {
// 		headers: setHeader(),
// 	});

// const createGroupChat = (data) =>
// 	axiosClientPrivate.post(URL + `groupConversation`, data, {
// 		headers: setHeader(),
// 	});

// const deleteConversation = (conversationId) =>
// 	axiosClientPrivate.delete(URL + `conversation/${conversationId}`, {
// 		headers: setHeader(),
// 	});

// const getMessages = (id, endTime = '', limit = 18) =>
// 	axiosClientPrivate.get(
// 		URL + `message/${id}?&limit=${limit}&endTime=${endTime}`,
// 		{ headers: setHeader() }
// 	);
// const changeGroupChatAvatar = (data) =>
// 	axiosClientPrivate.put(URL + `changeGroupAvatar`, data, {
// 		headers: setHeader(),
// 	});

// const renameGroupChat = (conversationId, groupName) =>
// 	axiosClientPrivate.put(
// 		URL + `renameGroup`,
// 		{
// 			conversationId,
// 			groupName,
// 		},
// 		{
// 			headers: setHeader(),
// 		}
// 	);

// const leaveGroupChat = (groupId) =>
// 	axiosClientPrivate.put(
// 		URL + `leaveGroup/${groupId}`,
// 		{},
// 		{
// 			headers: setHeader(),
// 		}
// 	);

// const addMember = (data) =>
// 	axiosClientPrivate.put(URL + `addMember`, data, {
// 		headers: setHeader(),
// 	});

// const removeMember = (conversationId, removeMemberId) =>
// 	axiosClientPrivate.put(
// 		URL + `removeMember`,
// 		{ conversationId, removeMemberId },
// 		{
// 			headers: setHeader(),
// 		}
// 	);

// const createMessage = (data) =>
// 	axiosClientPrivate.post(URL + `message`, data, {
// 		headers: setHeader(),
// 	});

// const deleteMessage = (messageId) =>
// 	axiosClientPrivate.delete(URL + `message/${messageId}`, {
// 		headers: setHeader(),
// 	});

// export {
// 	accessConversation,
// 	getConversations,
// 	createGroupChat,
// 	renameGroupChat,
// 	leaveGroupChat,
// 	deleteConversation,
// 	getMessages,
// 	addMember,
// 	removeMember,
// 	createMessage,
// 	deleteMessage,
// 	changeGroupChatAvatar,
// };
