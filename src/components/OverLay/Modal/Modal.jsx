import { ModalProvider, useModal } from './ModalContext';

import IconButton from 'components/Action/IconButton';
import { XMarkIcon } from 'components/Icon';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const Modal = ({
	open,
	onClose,
	onClickBackDrop = onClose,
	children,
	closeIcon = <XMarkIcon />,
}) => {
	// stop body scroll
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	if (!open) return null;

	return createPortal(
		<div className="fixed z-[9999]">
			<div
				className="fixed top-0 left-0 right-0 bottom-0
            backdrop-brightness-50"
				onClick={onClickBackDrop}
			></div>
			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				{closeIcon && <Close onClick={onClose}>{closeIcon}</Close>}
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
			className={clsx('absolute top-2 right-2', className)}
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

const Panel = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx(
				'overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl dark:bg-dark-800',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const Header = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx('h-14 w-full bg-inherit p-4', className)}
			{...props}
		>
			<h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-dark-100">
				{children}
			</h2>
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

Modal.Footer = Footer;

Modal.Panel = Panel;

export default Modal;

export { Root, Close, Trigger, Props, Header, Footer, Panel };
