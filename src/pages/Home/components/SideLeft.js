import UserProfileQuickView from '../../../components/UserProfileQuickView';
import SuggestionsUser from '../../../layouts/components/SidebarLeft/SuggestionsUser';

const SideLeft = () => {
	return (
		<div className="group flex flex-col">
			<div className="mb-4 flex">
				<UserProfileQuickView />
			</div>
		</div>
	);
};

export default SideLeft;
