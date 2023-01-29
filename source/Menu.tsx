import React, { useEffect, useState } from "react";
import { Box, Text, useFocus, useFocusManager, useInput } from "ink";
import { Indexer } from "nostr-indexer";
import Input from "./Input";

enum Route {
	MENU,
	ADD_RELAY,
	ADD_ACCOUNT,
}

enum MenuOption {
	START,
	STOP,
	ADD_ACCOUNT,
	ADD_RELAY,
	EXIT,
}

const Options = ({ indexer }: { indexer: Indexer }) => {
	const { focusNext, focusPrevious } = useFocusManager();
	const [route, setRoute] = useState<Route>(Route.MENU);

	useInput((input, key) => {
		if (key.upArrow) focusPrevious();
		if (key.downArrow) focusNext();
		if (key.escape && route == Route.MENU) process.exit();
		if (input == "q") process.exit();
	});

	useEffect(() => {
		// Focus when route changes
		focusNext();
	}, [route]);

	async function handleSelect(option: MenuOption) {
		switch (option) {
			case MenuOption.START:
				return indexer?.start();
			case MenuOption.STOP:
				return indexer?.stop();
			case MenuOption.ADD_RELAY:
				return setRoute(Route.ADD_RELAY);
			case MenuOption.ADD_ACCOUNT:
				return setRoute(Route.ADD_ACCOUNT);
			case MenuOption.EXIT:
				process.exit();
		}
	}

	async function addRelay(url: string) {
		await indexer.relayManager.addRelay(url);
		return setRoute(Route.MENU);
	}

	async function addAccount(pubkey: string) {
		await indexer.accountManager.addAccount({ pubkey });
		return setRoute(Route.MENU);
	}

	// Add Relay
	if (route == Route.ADD_RELAY) {
		return (
			<Input
				prompt="Enter relay url:"
				onSubmit={addRelay}
				onEscape={() => setRoute(Route.MENU)}
			/>
		);
	}

	// Add Account
	if (route == Route.ADD_ACCOUNT) {
		return (
			<Input
				prompt="Enter account pubkey:"
				onSubmit={addAccount}
				onEscape={() => setRoute(Route.MENU)}
			/>
		);
	}

	// Menu
	return (
		<Box flexDirection="column">
			<Text color="#FFA500">? Select an option:</Text>
			<Box flexDirection="column">
				<Item
					option={indexer.started ? MenuOption.STOP : MenuOption.START}
					label={indexer.started ? "Stop" : "Start"}
					onSelect={handleSelect}
				/>
				<Item
					option={MenuOption.ADD_RELAY}
					label="Add Relay"
					onSelect={handleSelect}
				/>
				<Item
					option={MenuOption.ADD_ACCOUNT}
					label="Add Account"
					onSelect={handleSelect}
				/>
				<Item option={MenuOption.EXIT} label="Exit" onSelect={handleSelect} />
			</Box>
		</Box>
	);
};

const Item = ({
	label,
	option,
	onSelect,
}: {
	label: string;
	option: MenuOption;
	onSelect: (option: MenuOption) => void;
}) => {
	const { isFocused } = useFocus();
	const props = {
		color: isFocused ? undefined : "gray",
	};

	useInput((_input, key) => {
		if (key.return && isFocused) {
			onSelect(option);
		}
	});

	return (
		<Text {...props}>
			{isFocused ? "> " : "  "}
			{label}
		</Text>
	);
};

export default Options;
