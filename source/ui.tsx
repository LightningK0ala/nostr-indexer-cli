import { Box } from "ink";
import React, { useState } from "react";
import { Relay, Account } from "nostr-indexer";
import Title from "./Title";
import Menu from "./Menu";
import useInterval from "./hooks/useInterval";
import Status from "./Status";
import useIndexer from "./hooks/useIndexer";

const App = () => {
	const indexer = useIndexer();
	const [started, setStarted] = useState<boolean>();
	const [startedAt, setStartedAt] = useState<Date>();
	const [relays, setRelays] = useState<Relay[]>();
	const [dbFileSize, setDbFileSize] = useState<number>();
	const [eventCount, setEventCount] = useState<number>();
	const [accounts, setAccounts] = useState(new Map<string, Account>());

	useInterval(async () => {
		setStarted(indexer.started);
		setStartedAt(indexer.startedAt);
		setRelays([...indexer.relayManager.relays.values()]);
		setDbFileSize(await indexer?.dbFileSize());
		setEventCount(await indexer?.db.getEventCount());
		setAccounts(indexer.accountManager.accounts);
	}, 100);

	const status = {
		started,
		startedAt,
		relays,
		dbFileSize,
		eventCount,
		accounts,
	};

	return (
		<Box flexDirection="column">
			<Title />
			<Status status={status} />
			<Menu indexer={indexer} />
		</Box>
	);
};

module.exports = App;
export default App;
