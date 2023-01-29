import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";

const Input = ({
	prompt,
	onSubmit,
	onEscape,
}: {
	prompt: string;
	onSubmit: (text: string) => any;
	onEscape: () => any;
}) => {
	const [inputText, setInputText] = useState("");

	useInput((_input, key) => {
		if (key.escape) {
			onEscape();
		}

		if (key.return) {
			onSubmit(inputText);
		}
	});

	return (
		<Box>
			<Box marginRight={1}>
				<Text>{prompt}</Text>
			</Box>
			<TextInput value={inputText} onChange={setInputText} />
		</Box>
	);
};

export default Input;
