import React from 'react';
import ListOfFollow from '../../../components/ListOfFollow';
import SuggestionsUser from '../../../layouts/components/SidebarLeft/SuggestionsUser';

const SideRight = () => {
	return (
		<div className="flex basis-[320px] flex-col gap-2">
			<ListOfFollow />
			<SuggestionsUser />
		</div>
	);
};

export default SideRight;
