import { XMarkIcon } from 'components/Icon';
import { createPortal } from 'react-dom';
import { toast, ToastBar, Toaster } from 'react-hot-toast';

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
									<XMarkIcon />
								</button>
							)}
						</>
					)}
				</ToastBar>
			)}
		</Toaster>,
		document.body
	);
};

export default ToasterClient;
