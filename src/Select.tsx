import { useEffect, useState } from "react";
import style from "./select.module.css";

export type SelectOption = {
	label: string;
	value: string | number;
};

// the options is for dropdown option list
// yet the value prop is for currently select option value
type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};
type MultipleSelectProps = {
	multiple: true;
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};
type SelectProps = {
	options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

// Usage 1: prop type
// Usage 2: return type
export function Select({ multiple, value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [hightlightedIndex, setHighlightedIndex] = useState(0);

	function clearOptions() {
		multiple ? onChange([]) : onChange(undefined);
	}
	function selectOption(option: SelectOption) {
		// calling function only if it need to change
		if (multiple) {
			if (value.includes(option)) {
				// click on the selected option will unselect it
				onChange(value.filter((o) => o != option));
			} else {
				onChange([...value, option]);
			}
		} else {
			if (option !== value) onChange(option);
		}
	}

	function isOptionSelected(option: SelectOption) {
		return multiple ? value.includes(option) : option === value;
	}

	useEffect(() => {
		// reset highlighted index everytime open the dropdown list
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);
	return (
		<>
			<div
				onBlur={() => setIsOpen(false)}
				onClick={() => setIsOpen((prev) => !prev)}
				tabIndex={0}
				className={style.container}
			>
				<span className={style.value}>
					{multiple
						? value.map((v) => (
								<button
									key={v.value}
									onClick={(e) => {
										e.stopPropagation();
										selectOption(v);
									}}
									className={`${style["option-badge"]}`}
								>
									{v.label}
									<span className={style["remove-btn"]}>
										&times;
									</span>
								</button>
						  ))
						: value?.label}
				</span>
				<button
					onClick={(e) => {
						e.stopPropagation();
						clearOptions();
					}}
					className={style["clear-btn"]}
				>
					&times;
				</button>
				<div className={style.divider}></div>
				<div className={style.caret}></div>
				<ul className={`${style.options} ${isOpen ? style.show : ""}`}>
					{options &&
						options.map((option, index) => (
							<li
								onClick={(e) => {
									e.stopPropagation();
									selectOption(option);
									setIsOpen(false);
								}}
								onMouseEnter={() => setHighlightedIndex(index)}
								key={option.value}
								className={`${style.option} ${
									isOptionSelected(option)
										? style.selected
										: ""
								} ${
									index === hightlightedIndex
										? style.highlighted
										: ""
								}`}
							>
								{option.label}
							</li>
						))}
				</ul>
			</div>
		</>
	);
}
