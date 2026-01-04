import { loadKeypair } from "./utils/wallet";
import { RaikuClient } from "./raiku/client";
import { runStressTest } from "./tx/stressTest";
import { RAIKU_RPC } from "./config/network";

async function main() {
  const wallet = loadKeypair("./wallet.json");
  const client = new RaikuClient(RAIKU_RPC, wallet);

  await runStressTest({
    client,
    wallet,
    totalTx: 30,
    concurrency: 3,
  });
}

main().catch(console.error);
