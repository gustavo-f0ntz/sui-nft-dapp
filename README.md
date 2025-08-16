# NFT dApp on Sui Blockchain

A complete NFT minting dApp built with React and Move smart contracts on Sui blockchain.

## Project Structure

```
dAppNFT/
├── sui-contract/     # Move smart contract
├── frontend/         # React dApp
└── README.md
```

## Quick Start

### 1. Deploy Smart Contract

```bash
cd sui-contract
sui client publish --gas-budget 100000000
```

Copy the Package ID from the output and update it in `frontend/src/App.tsx`.

### 2. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Features

- Connect Sui wallet
- Mint NFTs with custom metadata
- View transaction results
- Responsive UI with Radix components

## Tech Stack

- **Smart Contract**: Move language on Sui
- **Frontend**: React + TypeScript + Vite
- **UI**: Radix UI components
- **Blockchain**: Sui Network

## Development

1. Make sure you have Sui CLI installed
2. Set up your Sui wallet and fund it with testnet or devnet SUI
3. Deploy the contract first, then run the frontend
4. Update the package ID in the frontend code after deployment
