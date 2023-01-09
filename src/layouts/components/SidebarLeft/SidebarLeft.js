import SuggestionsUser from './SuggestionsUser';
import UserProfileQuickView from '../../../components/UserProfileQuickView';

const SidebarLeft = () => {
	return (
		<div className={`group flex h-full w-full flex-1 flex-col`}>
			<div className="mb-4 flex">
				<UserProfileQuickView />
			</div>
			<div className="mb-4 w-full flex-1 rounded-xl dark:bg-dark-regular">
				<SuggestionsUser />
			</div>
		</div>
	);
};

export default SidebarLeft;
