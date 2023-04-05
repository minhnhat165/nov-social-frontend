import { ToastBar, Toaster, toast } from 'react-hot-toast';

import { IconWrapper } from 'components/DataDisplay';
import { XMarkIcon } from 'components/Icon';
import { createPortal } from 'react-dom';

const ToasterClient = () => {
	return createPortal(
		<Toaster
			containerStyle={{
				zIndex: 99999999,
			}}
		>
			{(t) => (
				<ToastBar toast={t}>
					{({ icon, message }) => (
						<>
							{icon}
							{message}
							{t.type !== 'loading' && (
								<button
									onClick={(e) => {
										toast.dismiss(t.id);
									}}
								>
									<IconWrapper size={5}>
										<XMarkIcon />
									</IconWrapper>
								</button>
							)}
						</>
					)}
				</ToastBar>
			)}
		</Toaster>,
		document.body,
	);
};

export default ToasterClient;
