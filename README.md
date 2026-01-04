# Raiku Testnet Transaction Stress Toolkit

A lightweight **transaction stress & benchmarking toolkit** for Solana testnet, designed to explore **transaction behavior under concurrency**, RPC saturation, and execution patterns relevant to **Raiku-style deterministic transaction scheduling (JIT / AOT)**.

> ⚠️ **Testnet only** — not intended for mainnet usage.
<img src="https://imgur.com/ISur6ds"/>
<img src="https://imgur.com/Iz8xv5h"/>
---

## 🎯 Purpose

This project was created to:

- Explore **transaction behavior under load** on Solana testnet
- Observe **RPC rate-limiting, duplicate transaction handling, and retry behavior**
- Provide a **Raiku-compatible transaction intent abstraction**
- Serve as a **developer / infra testing tool** for scheduling-aware execution models

This repository is **not a dApp**, but an **infra-oriented developer toolkit**.

---

## ✨ Features

- ✅ Concurrent transaction stress testing
- ✅ Configurable total TX & concurrency
- ✅ Raiku-style execution intent abstraction (JIT / AOT ready)
- ✅ Works with standard Solana RPC
- ✅ Clean TypeScript codebase
- ✅ Real-world testnet findings
- ✅Explorer di Testnet
- ✅ CLI di Testnet
- ✅ App RPC di Testnet
- ✅ Wallet funded di Testnet
- ✅ TX pakai memo unik

---

## 📁 Project Structure

```
raiku-testnet-toolkit/
├─ src/
│ ├─ config/ # Network configuration
│ ├─ raiku/ # Raiku-compatible abstractions
│ ├─ tx/ # Transaction builders & stress tests
│ ├─ utils/ # Wallet & logging utilities
│ └─ index.ts # Entry point
├─ package.json
├─ tsconfig.json
└─ README.md
```


---

## 🧰 Prerequisites

Make sure you have:

- **Node.js ≥ 18**
- **npm ≥ 9**
- **Linux / macOS / WSL2**
- Internet access (Solana RPC + faucet)

Check versions:

```bash
node -v
npm -v
```


🔧 Installation
1️⃣ Clone the repository
```yaml
git clone https://github.com/<your-username>/raiku-testnet-toolkit.git
cd raiku-testnet-toolkit
```

2️⃣ Install dependencies
```
npm install
```

🔑 Wallet Setup (Solana Testnet)
3️⃣ Install Solana CLI
```
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

```

Add Solana to PATH:
```
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
Verify installation:
```
solana --version
```

4️⃣ Create a Solana wallet for the app

From the project root:
```
solana-keygen new --outfile wallet.json

```
This will generate a new keypair used only by this application.

🔐 Do not commit wallet.json to GitHub.

5️⃣ Get the wallet public key
```
solana-keygen pubkey wallet.json

```

Example output:
```
FRLsujeG4DaP3hdfMfrTAKZoXXxxxxxxxxxxxxxxxxxx
```

💰 Fund Wallet via Solana Faucet (Web)

CLI airdrops are often rate-limited on testnet.
Using the web faucet is recommended.

6️⃣ Open Solana Faucet

👉 https://faucet.solana.com/

Steps:

Select Testnet

Paste your wallet public key

Request SOL (1–5 SOL is enough)

7️⃣ Verify balance
```
solana balance <YOUR_PUBLIC_KEY>

```
⚙️ Configure Solana CLI (Recommended)

To avoid wallet confusion, set the app wallet as default:
```
solana config set --keypair wallet.json
solana config set --url https://api.testnet.solana.com

```
Verify:
```
solana config get
```

▶️ Running the Toolkit
8️⃣ Start the stress test
```
npm run dev
```
✅ Expected Output
```
APP WALLET: FRLsujeG4DaP3hdfMfrTAKZoXX58gYSbqTzeYWP2pRi9
[Raiku] Sending transaction...
[Raiku] Worker 0 → TX 1: <signature>
[Raiku] Worker 1 → TX 2: <signature>
[Raiku] Stress test completed
```
[Raiku] Stress test completed
Transaction signatures can be inspected on:
👉 https://explorer.solana.com (select Testnet)
🔧 Configuration

Stress parameters can be adjusted in src/index.ts:
```
await runStressTest({
  client,
  wallet,
  totalTx: 30,
  concurrency: 3,
});
```
Recommendations:

Start with totalTx: 5, concurrency: 1

Increase gradually to observe RPC behavior

⚠️ Known Behaviors (Expected)

Duplicate transaction signatures
Same transaction payload + same blockhash can produce identical signatures.
This is expected behavior on Solana, not a bug.

429 Too Many Requests
RPC rate-limiting under concurrency on testnet is expected and useful for stress testing.

Retry behavior
Indicates real-world load conditions.

These observations are valuable infra-level signals.

📊 Use Cases

Raiku testnet exploration

Scheduler / execution research

Developer tooling

RPC stress & behavior analysis

Transaction determinism experiments

🤝 Contributing

Contributions are welcome:

Metrics (latency, success rate)

JIT vs AOT comparisons

Improved retry logic

Documentation improvements

⚠️ Disclaimer

Testnet only

No mainnet usage

No financial guarantees

For research & development purposes only

📬 Context

This toolkit was built to explore transaction execution under load, with insights relevant to Raiku’s deterministic transaction vision.

If you are part of the Raiku team and find this useful, happy to collaborate further 🙌

