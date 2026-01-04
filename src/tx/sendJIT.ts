import { Keypair, Transaction } from "@solana/web3.js";
import { attachRaikuIntent } from "../raiku/intent";
import { buildSelfTransferTx } from "./buildTx";

export function buildJITTx(wallet: Keypair): Transaction {
  const tx = buildSelfTransferTx(wallet.publicKey);

  return attachRaikuIntent(tx, {
    mode: "JIT",
    maxSlotDelay: 3,
    priorityFee: 5_000,
  });
}
