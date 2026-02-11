# Trackz — Create & share music on-chain

Trackz is a SoundCloud-inspired plateform built with Next.js/TypeScript that explores how wallet-based identity, on-chain metadata and NFTs can be combined with IPFS-hosted audio. The goal is to experiment with an artist-owned publishing flow while keeping a familiar listening experience.

➡️ Live demo: [https://trackz.vercel.app](https://trackz.vercel.app) \
➡️ Repository: [https://github.com/Noctambul/trackz](https://github.com/Noctambul/trackz)

_The live demo is currently unavailable because the smart contract was deployed on the Rinkeby testnet, which has been sunset, and the contract is no longer accessible._

## ✨ Key features

- **Wallet-based sign-in** (thirdweb)
- **Track publishing flow**: upload audio to **IPFS** and mint metadata **on-chain** (Solidity, ERC-1155)
- **Listening experience**: browse and play tracks, basic navigation and playlists
- **Front-first architecture** with a backend layer via **Next.js API Routes**
- **Responsive UI** built with **Chakra UI** + **Tailwind CSS**
- **E2E testing** with **Cypress**

## 🧱 Tech stack

- **Web**: [NextJS](https://nextjs.org/) · [React](https://fr.reactjs.org/) · [Typescript](https://www.typescriptlang.org/) · [Tailwind](https://tailwindcss.com/) · [ChakraUI](https://chakra-ui.com/)
- **Web3**: [Thirdweb](https://portal.thirdweb.com/) · Solidity
- **Storage**: IPFS
- **Hosting**: [Vercel](https://vercel.com/noctambul/trackz)
- **Testing**: Cypress (E2E)

## 📁 Monorepo structure

- [web/](https://github.com/Noctambul/trackz/tree/main/web) — Next.js app (UI + API Routes)
- [smart-contract/](https://github.com/Noctambul/trackz/tree/main/smart-contract) — Solidity contracts

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Yarn or npm
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/trackz.git
cd trackz
```

2. **Install dependencies**

```bash
yarn install
```

3. **Smart Contract Setup**

```bash
cd smart-contract
yarn install
```

4. **Frontend Setup**

```bash
cd web
yarn install
cp .env.local.example .env.local
```

## 🧪 Testing

### Smart Contract Tests

Comprehensive test suite covering:

- Token minting and burning
- Royalty distribution
- Access control
- Edge cases and error handling

```bash
cd smart-contract
yarn hardhat:test
```

### Frontend Tests

End-to-end testing with Cypress:

- User authentication flows
- Music upload and minting
- Audio playback functionality
- Responsive design testing

```bash
cd web
yarn cypress:headless
```

## 🧠 Design & docs

- [Figma](https://www.figma.com/file/oBA123AjXUievHqzLZo4Vh/Trackz?node-id=0%3A1)
- [Notion](https://www.notion.so/Trackz-604c6ee77d494c9eb18d57d1c7bcf0ba)
