import { Keypair } from "@solana/web3.js";
import { RaikuClient } from "../raiku/client";
import { buildJITTx } from "./sendJIT";
import { log, error } from "../utils/logger";

interface StressTestOptions {
  client: RaikuClient;
  wallet: Keypair;
  totalTx?: number;
  concurrency?: number;
}

export async function runStressTest({
  client,
  wallet,
  totalTx = 50,
  concurrency = 5,
}: StressTestOptions) {
  let sent = 0;

  async function worker(id: number) {
    while (true) {
      if (sent >= totalTx) break;
      const current = ++sent;

      try {
        const tx = buildJITTx(wallet);
        const sig = await client.send(tx);
        log(`Worker ${id} → TX ${current}: ${sig}`);
      } catch (e: any) {
        error(`Worker ${id} failed`, e.message);
      }
    }
  }

  await Promise.all(
    Array(concurrency)
      .fill(0)
      .map((_, i) => worker(i))
  );

  log("Stress test completed");
}
