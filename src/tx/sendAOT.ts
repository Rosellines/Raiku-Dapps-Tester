import { Keypair, Transaction } from "@solana/web3.js";
import { attachRaikuIntent } from "../raiku/intent";
import { buildSelfTransferTx } from "./buildTx";

export function buildAOTTx(
  wallet: Keypair,
  targetSlot: number
): Transaction {
  const tx = buildSelfTransferTx(wallet.publicKey);

  return attachRaikuIntent(tx, {
    mode: "AOT",
    targetSlot,
    priorityFee: 3_000,
  });
}
