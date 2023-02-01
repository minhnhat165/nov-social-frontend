import Button from 'components/Action/Button';
import LoginForm from 'features/auth/components/Login/Form/LoginForm';
import Modal from 'components/OverLay/Modal';

const Components = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Modal.Control>
				<Modal.Trigger>
					<button>Open Modal</button>
				</Modal.Trigger>
				<Modal>
					<Modal.Close />
					<Modal.Props>
						{({ onClose }) => (
							<Modal.Panel>
								<Modal.Panel.Header>
									<Button onClick={onClose}>hello</Button>
								</Modal.Panel.Header>
								<Modal.Panel.Content>
									<LoginForm />
								</Modal.Panel.Content>
							</Modal.Panel>
						)}
					</Modal.Props>
				</Modal>
			</Modal.Control>
		</div>
	);
};

export default Components;
