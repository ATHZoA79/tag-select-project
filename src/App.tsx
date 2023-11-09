import { useState } from "react";
import { Select, SelectOption } from "./Select";

const options = [
	{ label: "First", value: 1 },
	{ label: "Second", value: 2 },
	{ label: "Third", value: 3 },
	{ label: "Fourth", value: 5 },
	{ label: "Fifth", value: 4 },
	{ label: "Sixth", value: 6 },
	{ label: "Seventh", value: 7 },
];

function App() {
	const [multiValue, setMultiValue] = useState<SelectOption[]>([options[0]]);
	const [value, setValue] = useState<SelectOption | undefined>(options[0]);
	return (
		<>
			<Select
				multiple={true}
				options={options}
				value={multiValue}
				onChange={(o) => setMultiValue(o)}
			/>
			<br />
			<Select
				multiple={false}
				options={options}
				value={value}
				onChange={(o) => setValue(o)}
			/>
		</>
	);
}

export default App;
