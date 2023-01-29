import { Indexer, createIndexer } from "nostr-indexer";
import { useRef } from "react";

export default function () {
	const indexerRef = useRef<Indexer | null>();
	if (!indexerRef.current) {
		const dbPath = process.env["DB_PATH"];
		if (!dbPath) throw new Error("DB_PATH is not set");
		const indexer = createIndexer({
			debug: true,
			dbPath,
		});
		indexerRef.current = indexer;
	}
	return indexerRef.current;
}
