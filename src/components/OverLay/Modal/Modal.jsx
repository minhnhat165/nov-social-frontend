import { ModalProvider, useModal } from './ModalContext';

import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { XMarkIcon } from 'components/Icon';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

export const Modal = ({
	open,
	onClose,
	onClickBackDrop = onClose,
	children,
	closeIcon = <XMarkIcon />,
}) => {
	if (!open) return null;
	// document.body.style.overflow = 'hidden';

	const closeModal = () => {
		// Remove scroll-lock styles from the body element when the modal is closed
		// document.body.style.overflow = 'auto';
		onClose();
	};
	return createPortal(
		<div className="fixed z-[9999]">
			<div
				className="fixed inset-0 bg-black/50"
				onClick={() => {
					closeModal();
					onClickBackDrop();
				}}
			/>
			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				{closeIcon && <Close onClick={closeModal}>{closeIcon}</Close>}
				{children}
			</div>
		</div>,
		document.body,
	);
};

const Root = ({ open, children }) => {
	return <ModalProvider rootOpen={open}>{children}</ModalProvider>;
};
const Close = ({ children, onClick, className, ...props }) => {
	return (
		<IconButton
			type="button"
			rounded
			size="sm"
			variant="text"
			color="secondary"
			className={clsx('absolute right-2 top-2', className)}
			onClick={onClick}
			{...props}
		>
			{children || <XMarkIcon />}
		</IconButton>
	);
};

const Trigger = ({ children }) => {
	const { openModal } = useModal();
	return (
		<div className="cursor-pointer" onClick={openModal}>
			{children}
		</div>
	);
};

const Props = ({ children }) => {
	const props = useModal();
	return <>{children(props)}</>;
};

const RenderProps = ({ children }) => {
	const props = useModal();
	return <>{children(props)}</>;
};

const Panel = ({ responsive, children, className, ...props }) => {
	return (
		<Layer
			className={clsx(
				'overflow-hidden text-left align-middle shadow-xl',
				className,
				responsive && 'h-screen w-screen sm:h-fit sm:w-fit',
			)}
			{...props}
			responsive={responsive}
		>
			{children}
		</Layer>
	);
};

const Header = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx('h-14 w-full bg-inherit p-4', className)}
			{...props}
		>
			<h2 className="text-xl font-bold leading-6 text-gray-900 dark:text-dark-100">
				{children}
			</h2>
		</div>
	);
};

const Body = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx(
				'flex-grow overflow-y-auto bg-inherit px-4 pb-4',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const Footer = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx(
				'flex h-14 w-full items-center border-t bg-inherit p-4 dark:border-dark-700',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

Modal.Root = Root;

Modal.Close = Close;

Modal.Trigger = Trigger;

Modal.Props = Props;

Modal.RenderProps = RenderProps;

Modal.Header = Header;

Modal.Body = Body;

Modal.Footer = Footer;

Modal.Panel = Panel;

export { Root, Close, Trigger, Props, Header, Footer, Panel };
