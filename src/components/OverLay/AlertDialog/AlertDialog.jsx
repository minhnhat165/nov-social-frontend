import { CancelOrOk } from 'components/Action';
import { Modal } from '../Modal';
import React from 'react';
import { Text } from 'components/Typography';

export const AlertDialog = ({
	isOpen,
	close,
	isLoading,
	onOk,
	headerText,
	bodyText,
	cancelText = 'Cancel',
	okText = 'Continue',
}) => {
	return (
		<Modal open={isOpen} onClose={close}>
			<Modal.Panel responsive>
				<Modal.Header>{headerText}</Modal.Header>

				<Modal.Body className="sm:w-[490px]">
					<Text>{bodyText}</Text>
				</Modal.Body>
				<Modal.Footer className="justify-end gap-2">
					<CancelOrOk
						cancelText={cancelText}
						okText={okText}
						onCancel={close}
						okLoading={isLoading}
						onOk={onOk}
					/>
				</Modal.Footer>
			</Modal.Panel>
		</Modal>
	);
};
