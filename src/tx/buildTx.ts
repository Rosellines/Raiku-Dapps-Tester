import {
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

/**
 * Build a self-transfer transaction with a unique memo
 * to ensure unique signatures on-chain.
 */
export function buildSelfTransferTx(
  from: PublicKey,
  memo: string
): Transaction {
  const tx = new Transaction();

  // Self transfer (pays fee + keeps account alive)
  tx.add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: from,
      lamports: 1,
    })
  );

  // Memo instruction (forces unique tx signature)
  tx.add({
    keys: [],
    programId: new PublicKey(
      "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
    ),
    data: Buffer.from(memo),
  });

  return tx;
}
