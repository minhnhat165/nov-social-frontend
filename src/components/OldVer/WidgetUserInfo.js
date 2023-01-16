import { format } from 'date-fns';
import { useMemo } from 'react';

const WidgetUserInfo = ({ user }) => {
	const items = useMemo(() => {
		const rawList = [
			{
				title: 'Date of birth',
				key: 'dateOfBirth',
				icon: <i className="fa-duotone fa-cake-candles"></i>,
			},
			{
				title: 'Gender',
				key: 'gender',
				icon: <i className="fa-duotone fa-person-half-dress"></i>,
			},
			{
				title: 'Phone',
				key: 'phoneNumber',
				icon: <i className="fa-duotone fa-phone"></i>,
			},
			{
				title: 'From',
				key: 'homeTown',
				icon: <i className="fa-duotone fa-location-dot"></i>,
			},

			{
				title: 'Lives in',
				key: 'address',
				icon: <i className="fa-duotone fa-house"></i>,
			},
		];

		const result = [];

		rawList.forEach((item) => {
			if (user[item.key]) {
				item.content = user[item.key];
				if (item.key === 'dateOfBirth')
					item.content = format(
						new Date(user[item.key]),
						'dd-MM-yyyy'
					);
				result.push(item);
			}
		});

		return result;
	}, [user]);
	return (
		<div className="mt-4 w-full rounded-xl py-2 dark:bg-dark-regular">
			<ul>
				{items.map((item) => (
					<li
						key={item.title}
						className="flex items-center justify-between p-4 py-2"
					>
						<div className="flex flex-col">
							<span className="font-bold dark:text-dark-text-bold">
								{item.title}
							</span>
							<span className="dark:text-dark-text-regular">
								{item.content}
							</span>
						</div>
						<div className="flex h-8 w-8 items-center justify-center text-xl dark:text-dark-text-bold">
							{item.icon}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetUserInfo;
