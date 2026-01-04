import {
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

export function buildSelfTransferTx(
  from: PublicKey
): Transaction {
  return new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: from,
      lamports: 1,
    })
  );
}
