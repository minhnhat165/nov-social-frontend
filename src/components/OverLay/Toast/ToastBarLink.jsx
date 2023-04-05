import { IconWrapper } from 'components/DataDisplay';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography';
import { XMarkIcon } from 'components/Icon';
import { toast } from 'react-hot-toast';

export const ToastBarLink = ({ t, to, linkMessage, message, icon }) => {
	return (
		<div
			className={`flex items-center gap-2 rounded-lg bg-white py-4 px-[10px] shadow-lg  dark:bg-dark-bold ${
				t.visible ? 'animate-enter' : 'animate-leave'
			}`}
		>
			{icon && (
				<IconWrapper size={5} className="text-normal">
					{icon}
				</IconWrapper>
			)}
			<Text>
				{message}{' '}
				<Link
					to={to}
					onClick={(e) => {
						toast.dismiss(t.id);
					}}
					className="text-primary-700 dark:text-primary-500"
				>
					{linkMessage}
				</Link>
			</Text>
			{t.type !== 'loading' && (
				<button
					onClick={(e) => {
						toast.dismiss(t.id);
					}}
				>
					<IconWrapper size={5} className="text-normal">
						<XMarkIcon />
					</IconWrapper>
				</button>
			)}
		</div>
	);
};
