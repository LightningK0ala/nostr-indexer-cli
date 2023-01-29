import React from "react";
import { Box, Text } from "ink";
import { Relay, Account } from "nostr-indexer";

type StatusType = {
	started?: boolean;
	startedAt?: Date;
	relays?: Relay[];
	dbFileSize?: number;
	eventCount?: number;
	accounts?: Map<string, Account>;
};

const Status = ({
	status: { started, startedAt, relays, dbFileSize, eventCount, accounts },
}: {
	status: StatusType;
}) => {
	const connectedRelays = relays?.filter((relay) => relay.connected);
	return (
		<Box
			flexDirection="column"
			marginBottom={1}
			borderColor="blue"
			borderStyle="classic"
		>
			<Text>
				Running:{" "}
				<Text color={started ? "green" : "red"}>{started ? "Yes" : "No"}</Text>
			</Text>
			<Text>Started At: {startedAt?.toUTCString()}</Text>
			<Text>
				Relays: {relays?.length} ({connectedRelays?.length} connected)
			</Text>
			<Text>Events: {eventCount}</Text>
			<Text>DB File Size: {dbFileSize}</Text>
			<Text>Accounts: {accounts?.size}</Text>
		</Box>
	);
};

export default Status;
