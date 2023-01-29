#/bin/bash

# For use in development when nostr-indexer is
# symlinked locally and schema changes

CURRENT_PATH="$(pwd)"
INDEXER_PATH=~/Projects/nostr-indexer/nostr-indexer
DB_PATH=~/Projects/nostr-indexer/nostr-indexer-cli/dev.db
rm -f ${DB_PATH}
cd ${INDEXER_PATH}
rm -rf prisma/migrations
DATABASE_URL=file://${DB_PATH} npx prisma migrate dev --name init --skip-seed
cd ${CURRENT_PATH}
DATABASE_URL=file:~/Projects/nostr-indexer/nostr-indexer-cli/dev.db npx ts-node --compiler-options {\"module\":\"CommonJS\"} node_modules/nostr-indexer/prisma/seed.ts
