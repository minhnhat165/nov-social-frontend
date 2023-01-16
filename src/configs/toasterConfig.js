import { XmarkIcon } from 'components/Icon';
import { createPortal } from 'react-dom';
import { toast, ToastBar, Toaster } from 'react-hot-toast';

const ToasterClient = () => {
	return createPortal(
		<Toaster
			containerStyle={{
				zIndex: 9999,
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
										e.stopPropagation();
										toast.dismiss(t.id);
									}}
								>
									<XmarkIcon />
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
