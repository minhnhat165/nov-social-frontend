const {
	createContext,
	useState,
	useContext,
	cloneElement,
	Children,
	useEffect,
} = require('react');

const ModalContext = createContext({
	open: false,
	setOpen: () => {},
	openModal: () => {},
	closeModal: () => {},
});

const useModal = () => useContext(ModalContext);

const ModalProvider = ({ rootOpen = false, children }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(rootOpen);
	}, [rootOpen]);

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
	};

	return (
		<ModalContext.Provider value={{ open, setOpen, openModal, closeModal }}>
			{Children.map(children, (child, index) => {
				const { name: childName } = child.type;

				if (childName === 'Modal') {
					return cloneElement(child, {
						key: index,
						open,
						onClose: closeModal,
					});
				}
				return child;
			})}
		</ModalContext.Provider>
	);
};

export { ModalContext, ModalProvider, useModal };
