import {
  Connection,
  Keypair,
  Transaction,
} from "@solana/web3.js";
import { log } from "../utils/logger";

export class RaikuClient {
  connection: Connection;
  wallet: Keypair;

  constructor(rpcUrl: string, wallet: Keypair) {
    this.connection = new Connection(rpcUrl, "confirmed");
    this.wallet = wallet;
  }

  async send(tx: Transaction) {
    tx.feePayer = this.wallet.publicKey;

    const { blockhash } =
      await this.connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    tx.sign(this.wallet);

    log("Sending transaction...");
    return this.connection.sendRawTransaction(
      tx.serialize(),
      {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      }
    );
  }
}
