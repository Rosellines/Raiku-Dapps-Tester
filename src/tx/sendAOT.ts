import { Keypair, Transaction } from "@solana/web3.js";
import { attachRaikuIntent } from "../raiku/intent";
import { buildSelfTransferTx } from "./buildTx";

/**
 * Build an AOT (Ahead-of-Time) transaction with a unique memo
 * so it produces a unique signature on-chain.
 */
export function buildAOTTx(
  wallet: Keypair,
  targetSlot: number,
  id: number
): Transaction {
  const tx = buildSelfTransferTx(
    wallet.publicKey,
    `raiku-aot-${id}-${targetSlot}-${Date.now()}`
  );

  return attachRaikuIntent(tx, {
    mode: "AOT",
    targetSlot,
    priorityFee: 3_000,
  });
}
