import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useSelectContext } from '..';

const SelectOptions = ({ children, className }) => {
	const {
		options,
		isOpen,
		setIsOpen,
		triggerRef,
		selectedOption,
		handleSelect,
	} = useSelectContext();
	const [hoveredOption, setHoveredOption] = useState(null);
	const hoveredRef = useRef(null);
	const indexOfPreviousSearch = useRef(null);
	const shouldScroll = useRef(false);
	const isKeyPressTriggered = useRef(false);
	const handleHover = useCallback(
		(option) => {
			if (isKeyPressTriggered.current) return;
			else setHoveredOption(option);
		},
		[setHoveredOption],
	);

	const handleMouseMove = (event) => {
		isKeyPressTriggered.current = false;
	};

	const handleKeyDown = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			isKeyPressTriggered.current = true;
			switch (e.key) {
				case 'ArrowDown':
					if (hoveredOption) {
						const hoveredOptionIndex = options.findIndex(
							(option) => option.value === hoveredOption.value,
						);

						if (hoveredOptionIndex < options.length - 1) {
							setHoveredOption(options[hoveredOptionIndex + 1]);
						}
					} else {
						setHoveredOption(options[0]);
					}
					break;
				case 'ArrowUp':
					if (hoveredOption) {
						const hoveredOptionIndex = options.findIndex(
							(option) => option.value === hoveredOption.value,
						);
						if (hoveredOptionIndex > 0) {
							setHoveredOption(options[hoveredOptionIndex - 1]);
						}
					} else {
						setHoveredOption(options[options.length - 1]);
					}
					break;
				case 'Enter':
					if (hoveredOption) {
						handleSelect(hoveredOption);
					}
					break;
				case 'Escape':
					setIsOpen(false);

					break;
				default:
					if (e.key.length === 1) {
						const search = e.key.toLowerCase();

						// create a new array to store the index of option that matches the search
						const allIndexSearchResult = [];
						// loop through all options to find the matching option
						options.forEach((option, index) => {
							if (
								(typeof option.label === 'string' &&
									option.label
										.toLowerCase()
										.startsWith(search)) ||
								(typeof option.label === 'number' &&
									option.label.toString().startsWith(search))
							) {
								// if the option matches, add the index to the new array
								allIndexSearchResult.push(index);
							}
						});

						// if there are matching options
						if (allIndexSearchResult.length > 0) {
							// if there is a previous search result
							if (indexOfPreviousSearch.current !== null) {
								// find the index of the previous search result
								const indexOfPreviousSearchResult =
									allIndexSearchResult.findIndex(
										(index) =>
											index ===
											indexOfPreviousSearch.current,
									);

								// if the previous search result is not the last one in the array
								if (
									indexOfPreviousSearchResult <
									allIndexSearchResult.length - 1
								) {
									// set the hovered option to the next matching option
									setHoveredOption(
										options[
											allIndexSearchResult[
												indexOfPreviousSearchResult + 1
											]
										],
									);
									// update the previous search result index
									indexOfPreviousSearch.current =
										allIndexSearchResult[
											indexOfPreviousSearchResult + 1
										];
								} else {
									// set the hovered option to the first matching option
									setHoveredOption(
										options[allIndexSearchResult[0]],
									);
									// update the previous search result index
									indexOfPreviousSearch.current =
										allIndexSearchResult[0];
								}
							} else {
								// set the hovered option to the first matching option
								setHoveredOption(
									options[allIndexSearchResult[0]],
								);
								// update the previous search result index
								indexOfPreviousSearch.current =
									allIndexSearchResult[0];
							}
						}
					}

					break;
			}
			shouldScroll.current = true;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[hoveredOption, options, handleSelect],
	);

	useEffect(() => {
		if (!isOpen) return;
		setTimeout(() => {
			if (hoveredRef.current) {
				hoveredRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}, 1);
		setHoveredOption(selectedOption);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	useEffect(() => {
		if (shouldScroll.current)
			setTimeout(() => {
				if (hoveredRef.current) {
					hoveredRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			}, 1);
		shouldScroll.current = false;
	}, [hoveredOption]);

	const ref = useRef(null);

	useEffect(() => {
		if (isOpen && ref.current) {
			ref.current.focus();
		}
	}, [isOpen, ref]);

	return (
		<Tippy
			visible={isOpen}
			reference={triggerRef}
			interactive
			offset={[0, 8]}
			appendTo={() => document.body}
			placement="bottom"
			onClickOutside={() => setIsOpen(false)}
			render={(attrs) => (
				<ul
					{...attrs}
					ref={ref}
					tabIndex={-1}
					onKeyDown={handleKeyDown}
					onMouseMove={handleMouseMove}
					className={clsx(
						'overflow-y-overlay scrollbar-hoverAble scrollbar-track-transparent dark:bg-dark-90 max-h-96 w-32 rounded-lg bg-white p-2 shadow focus:outline-none dark:bg-dark-900',
						className,
					)}
				>
					{Children.map(children, (child) => {
						if (!child) return null;
						return cloneElement(child, {
							onMouseEnter: () => {
								handleHover({
									value: child.props.value,
									label: child.props.children,
								});
							},
							onMouseLeave: () => {
								handleHover(null);
							},
							onClick: () => {
								handleSelect({
									value: child.props.value,
									label: child.props.children,
								});
							},
							isHover: hoveredOption?.value === child.props.value,
							isSelected:
								selectedOption?.value === child.props.value,
							ref:
								hoveredOption?.value === child.props.value
									? hoveredRef
									: null,
						});
					})}
				</ul>
			)}
		>
			<></>
		</Tippy>
	);
};

export default SelectOptions;
