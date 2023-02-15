import { createContext, useCallback, useContext, useState } from 'react';

import SelectOption from './SelectOption';
import SelectOptions from './SelectOptions';
import SelectTrigger from './SelectTrigger';

const SelectContext = createContext({
	selectedValue: null,
	setSelectedValue: () => {},
	isOpen: false,
	setIsOpen: () => {},
	options: [],
	setOptions: () => {},
	handleSelect: () => {},
	triggerRef: null,
	setTriggerRef: () => {},
	selectedOption: null,
	setSelectedOption: () => {},
});
const useSelectContext = () => {
	const context = useContext(SelectContext);
	return context;
};
const Select = ({ children, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [triggerRef, setTriggerRef] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const handleSelect = useCallback(
		(option) => {
			setIsOpen(false);
			setSelectedOption(option);
			onChange && onChange(option.value);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return (
		<SelectContext.Provider
			value={{
				isOpen,
				setIsOpen,
				options,
				setOptions,
				handleSelect,
				triggerRef,
				setTriggerRef,
				selectedOption,
				setSelectedOption,
			}}
		>
			{children}
		</SelectContext.Provider>
	);
};

Select.Option = SelectOption;

Select.Options = SelectOptions;

Select.Trigger = SelectTrigger;

export { Select, useSelectContext, SelectOption, SelectOptions, SelectTrigger };
