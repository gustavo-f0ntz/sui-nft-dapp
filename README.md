# 💧 Sui NFT dApp - Workshop Módulos 4 & 5


## 🎯 Visão Geral do Projeto

Bem-vindo ao repositório oficial da dApp construída durante o workshop **Sui Brasil: Módulos 04 e 05**. Este projeto serve como um exemplo prático e completo de como construir uma aplicação descentralizada (dApp) full-stack na blockchain da Sui, desde o smart contract em Move até a interface de usuário em React.

O objetivo principal é fornecer uma base de código limpa, funcional e bem documentada que sirva como um recurso educacional para novos desenvolvedores que estão a começar a sua jornada no ecossistema Sui.

---

## 📚 O Que Você Vai Aprender com Este Projeto?

Este repositório é a aplicação prática dos conceitos ensinados nos Módulos 4 e 5. Ao explorar este código, você entenderá como:

* [✔] **Estruturar um Smart Contract de NFT** em Move, com `structs` e `entry functions`.
* [✔] **Publicar um contrato** na Devnet da Sui usando o Sui CLI.
* [✔] **Configurar um projeto Front-end** moderno com React, TypeScript e Vite.
* [✔] **Conectar uma dApp à blockchain da Sui** usando o dApp Kit (`SuiClientProvider`, `WalletProvider`).
* [✔] **Integrar a conexão com carteiras Sui** de forma simples com o componente `<ConnectButton />`.
* [✔] **Ler dados da blockchain** (como o endereço da carteira conectada) usando hooks como `useCurrentAccount`.
* [✔] **Construir e executar transações** para escrever na blockchain (mintar um NFT) usando `TransactionBlock` e o hook `useSignAndExecuteTransactionBlock`.

---

## 🛠️ Tecnologias Utilizadas

* **Blockchain:** Sui
* **Smart Contracts:** Move
* **Front-end:** React, TypeScript, Vite
* **Conexão Web3:** Sui dApp Kit, Sui TypeScript SDK
* **UI:** CSS puro (para fins didáticos)

---

## 📁 Estrutura do Repositório

Este projeto é um "monorepo", contendo tanto o código do contrato quanto o do front-end em um só lugar para facilitar o desenvolvimento.

```
/
├── 📄 README.md            <-- Você está aqui!
│
├── 📁 sui-contract/        <-- Nosso Smart Contract em Move
│   ├── 📄 Move.toml
│   └── 📁 sources/
│       └── 📄 meu_nft.move
│
└── 📁 frontend/            <-- Nossa dApp em React
    ├── 📁 src/
    │   ├── 📄 App.tsx
    │   └── 📄 main.tsx
    ├── 📄 package.json
    └── ... (outros arquivos do Vite)
```

---

## � Guia de Montagem

Para instruções detalhadas e passo a passo sobre como montar e configurar este projeto do zero, consulte nosso guia completo:

**➡️ [GUIA DE MONTAGEM](docs/GUIA%20DE%20MONTAGEM.md)**

Este guia contém informações detalhadas sobre:
- Configuração do ambiente de desenvolvimento
- Instalação e configuração das dependências
- Deploy do smart contract
- Configuração da interface
- Troubleshooting e resolução de problemas comuns

---

## �🚀 Guia de Setup: Rodando o Projeto Localmente

Siga este passo a passo para ter a dApp completa a funcionar na sua máquina.

### Pré-requisitos

1.  **Node.js:** Garanta que você tem o Node.js instalado (versão 18 ou superior).
2.  **Sui CLI:** Garanta que você tem o Sui CLI instalado e configurado para a **Devnet**.

### Passo 1: Clone o Repositório

```bash
git clone [https://github.com/gustavo-f0ntz/sui-nft-dapp.git](https://github.com/gustavo-f0ntz/sui-nft-dapp.git)
cd sui-nft-dapp
```

### Passo 2: Publique o Smart Contract

Primeiro, precisamos da nossa "fábrica de NFTs" na blockchain.

1.  Navegue até a pasta do contrato:
    ```bash
    cd sui-contract
    ```
2.  Publique o contrato na Devnet:
    ```bash
    sui client publish --gas-budget 50000000
    ```
3.  O terminal vai retornar várias informações. Procure pelo **`Package ID`** e **copie este valor**. Ele será algo como `0x...`.

### Passo 3: Configure e Rode o Front-end

Agora, vamos ligar a nossa "loja".

1.  Navegue até a pasta do front-end:
    ```bash
    # Se você está em 'sui-contract', primeiro volte: cd ..
    cd frontend
    ```
2.  Instale todas as dependências:
    ```bash
    npm install
    ```
3.  Abra o projeto no seu editor de código (VS Code).
4.  Vá até o arquivo `src/App.tsx`.
5.  Encontre a linha que inicializa o estado `nftForm` e **cole o seu `Package ID`** que você copiou no Passo 2.
    ```tsx
    const [nftForm, setNftForm] = useState({
      packageId: '0xCOLE_SEU_PACKAGE_ID_AQUI', // <-- AQUI!
      // ...
    });
    ```
6.  Salve o arquivo e, no terminal, inicie a aplicação:
    ```bash
    npm run dev
    ```

### Passo 4: Teste a dApp!

1.  Abra o link `http://localhost:5173` no seu navegador.
2.  Pegue SUI da Faucet para a sua carteira na Devnet.
3.  Conecte sua carteira na dApp.
4.  Preencha os campos do NFT e clique em "Mintar NFT Agora!".
5.  Aprove a transação na sua carteira e veja a magia acontecer!

---

## 🏛️ Arquitetura Conceitual da dApp

* **O Smart Contract (`meu_nft.move`):** É o cérebro da nossa aplicação, a "fábrica de NFTs". Ele vive na blockchain e define as regras de como um NFT é criado e quem será seu dono.
* **O Front-end (`App.tsx`):** É a "vitrine da loja". É a interface com a qual o usuário interage, escrita em React.
* **A Conexão (`main.tsx`):** Usamos os `Providers` do dApp Kit para conectar nossa "loja" à "rede elétrica" da Sui, permitindo a comunicação.
* **A Interação (`hooks`):** Usamos os hooks do dApp Kit como "ferramentas" para ler dados (`useCurrentAccount`) e para executar ações (`useSignAndExecuteTransactionBlock`).

---

## ✨ Próximos Passos e Desafios

Este projeto é uma base sólida. A partir daqui, você pode explorar:
* **Construir um app DeFi:** Use a lógica do `marketplace` do Módulo 4 para permitir a troca dos NFTs criados.
* **Integrar zkLogin:** Explore os conceitos do Módulo 5 para permitir o login com contas sociais.
* **Implementar Transações Patrocinadas:** Ofereça o mint de graça para seus usuários.

---

## 💖 Agradecimentos

Um agradecimento especial ao **BrazillianCare (BC)** e à comunidade **Sui Brasil** pelo incentivo e pela oportunidade de construir e compartilhar este material.