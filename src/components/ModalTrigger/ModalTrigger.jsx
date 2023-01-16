import Modal from 'components/Modal';
import { useState } from 'react';

const ModalTrigger = ({ children, trigger }) => {
	const [show, setShow] = useState(false);
	return (
		<>
			<div onClick={() => setShow(true)}>{trigger}</div>
			<Modal show={show} onClose={() => setShow(false)}>
				{children(setShow)}
			</Modal>
		</>
	);
};

export default ModalTrigger;
