import React from 'react';
import Box from './Box';
import Button from './ButtonOld';
import LoadingOverlay from './LoadingOverlay';
import Modal from './Modal';

const ConfirmBox = ({
	show,
	setShow,
	onConfirm,
	header,
	content,
	buttonText,
	loading,
	children,
}) => {
	return (
		<Modal show={show} setShow={setShow}>
			<Box header={header}>
				<div className="w-[548px] p-4 dark:text-dark-text-regular">
					{content}
					{children}
					<div className="mt-6 flex items-center justify-end gap-2">
						<Button
							small
							className="bg-transparent px-6 shadow-none dark:hover:bg-dark-very-light"
							onClick={() => setShow(false)}
						>
							<span className="text-primary">Cancel</span>
						</Button>
						<Button
							small
							primary
							onClick={onConfirm}
							className="px-6"
						>
							{buttonText}
						</Button>
					</div>
				</div>
				{loading && <LoadingOverlay />}
			</Box>
		</Modal>
	);
};

export default ConfirmBox;
