# 🛠️ Guia de Montagem: Criando sua Primeira dApp de NFT na Sui

Bem-vindo, desenvolvedor! Este guia é um passo a passo completo para construir uma aplicação descentralizada (dApp) funcional que cria NFTs na Devnet da Sui.

## ✅ Pré-requisitos

1.  **Node.js:** Versão 18 ou superior.
2.  **Sui CLI:** Instalado e configurado para a **Devnet**.

## 🚀 Passo a Passo da Construção

### Etapa 1: Setup do Projeto Front-end

1.  **Crie o projeto com Vite:**
    ```bash
    npm create vite@latest minha-primeira-dapp-sui -- --template react-ts
    ```
2.  **Entre na pasta e instale as dependências:**
    ```bash
    cd minha-primeira-dapp-sui
    npm install
    ```
3.  **Instale os SDKs da Sui:**
    ```bash
    npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query
    ```

### Etapa 2: Publicando o Smart Contract

Nossa dApp precisa de uma "fábrica" de NFTs.

1.  Abra um **novo terminal**.
2.  Navegue até a pasta `sui-contract` do repositório.
3.  Publique o contrato:
    ```bash
    sui client publish --gas-budget 50000000
    ```
4.  **Guarde os resultados!** O terminal vai mostrar vários objetos criados. Anote dois deles:
    * O **`Package ID`** (o endereço do seu contrato).
    * O **`ID`** do objeto **`Publisher`**.

### Etapa 3: Configurando o Display do NFT (Passo Crucial!)

Agora, vamos dizer à Sui como exibir nossos NFTs de forma bonita.

1.  Ainda no terminal, execute o comando abaixo, substituindo `[PACKAGE_ID]` e `[PUBLISHER_ID]` pelos valores que você anotou.
    ```bash
    sui client call --function create_display --module meu_nft --package [PACKAGE_ID] --args [PUBLISHER_ID] --gas-budget 10000000
    ```

### Etapa 4: Configurando o Código do Front-end

Agora vamos montar o código da nossa dApp.

1.  **Abra o projeto** no seu editor de código (VS Code).

2.  **Configure a Conexão (`src/main.tsx`):** Substitua todo o conteúdo do arquivo `src/main.tsx` por este:

    ```tsx
    // Em: src/main.tsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';

    import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
    import { getFullnodeUrl } from '@mysten/sui/client';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import '@mysten/dapp-kit/dist/index.css';

    const queryClient = new QueryClient();
    const networks = {
      devnet: { url: getFullnodeUrl('devnet') },
    };

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networks} defaultNetwork="devnet">
            <WalletProvider>
              <App />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </React.StrictMode>,
    );
    ```

3.  **Crie a Interface e a Lógica (`src/App.tsx`):** Substitua todo o conteúdo do arquivo `src/App.tsx` por este:

    ```tsx
    // Em: src/App.tsx
    import { ConnectButton, useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
    import { TransactionBlock } from '@mysten/sui/transactions';
    import { useState } from 'react';

    function App() {
      const currentAccount = useCurrentAccount();
      const { mutate: signAndExecuteTransactionBlock, isPending } = useSignAndExecuteTransactionBlock();
      const [packageId, setPackageId] = useState(''); // Deixamos vazio para o aluno preencher

      function handleMint() {
        if (!packageId || !packageId.startsWith('0x')) {
          alert('Por favor, insira um Package ID válido.');
          return;
        }

        const txb = new TransactionBlock();
        txb.moveCall({
          target: `${packageId}::meu_nft::mint`,
          arguments: [
            txb.pure.string('Meu Primeiro NFT na Aula!'),
            txb.pure.string('Construído ao vivo com a comunidade Sui Brasil!'),
            txb.pure.string('[https://....'), // coloca a URL
          ],
        });

        signAndExecuteTransactionBlock(
          { transactionBlock: txb },
          {
            onSuccess: (result) => {
              alert(`NFT mintado com sucesso! Veja no explorer: https://suiscan.xyz/devnet/tx/${result.digest}`);
            },
            onError: (error) => {
              alert(`Erro ao mintar NFT: ${error.message}`);
            },
          }
        );
      }

      return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Sui NFT dApp</h1>
            <ConnectButton />
          </header>
          
          <hr style={{ margin: '20px 0' }} />

          <main>
            {!currentAccount ? (
              <p>Por favor, conecte sua carteira para começar.</p>
            ) : (
              <div>
                <h2>Carteira Conectada</h2>
                <p style={{ wordBreak: 'break-all' }}>Endereço: {currentAccount.address}</p>
                
                <hr style={{ margin: '20px 0' }} />

                <h2>Mintar NFT</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
                  <label>Package ID do seu Smart Contract:</label>
                  <input
                    type="text"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    placeholder="Cole o Package ID da Etapa 2 aqui"
                    style={{ padding: '8px', fontSize: '14px' }}
                  />
                  <button
                    onClick={handleMint}
                    disabled={isPending || !packageId}
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px' }}
                  >
                    {isPending ? 'Mintando...' : 'Mintar NFT'}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      );
    }

    export default App;
    ```

4.  **Inicie a Aplicação:** No terminal, na pasta `frontend` (`minha-primeira-dapp-sui`), rode:
    ```bash
    npm run dev
    ```

### Etapa 5: Testando a dApp

1.  Abra o link `http://localhost:5173`.
2.  Pegue SUI da Faucet para a sua carteira.
3.  Conecte a carteira.
4.  **Cole o `Package ID`** que você publicou na Etapa 2 no campo de input.
5.  Clique em "Mintar NFT" e aprove a transação!

**Parabéns!** Se tudo deu certo, você construiu e configurou sua primeira dApp de NFT na Sui.

---

## 🏛️ Entendendo o Código (Conceitos-Chave)

O que acabamos de construir? Vamos entender as peças principais.

### Os Provedores (A Fundação em `main.tsx`)

* **`SuiClientProvider`**: Pense nele como a **"companhia elétrica"**. Ele conecta nossa dApp à rede de energia da Sui (a Devnet), permitindo enviar e receber dados.
* **`WalletProvider`**: Pense nele como o **"controle remoto universal"**. Ele detecta quais carteiras (`Slush`, `Suiet`, etc.) o usuário tem e gerencia a comunicação com elas.

### Os Hooks e Componentes (As Ferramentas em `App.tsx`)

* **`<ConnectButton />`**: Um componente pronto que é o "portão de entrada". Ele lida com toda a complexidade de mostrar as carteiras e conectar o usuário.
* **`useCurrentAccount`**: O "crachá de identificação". Um hook que nos informa qual usuário está conectado e qual é o seu endereço.
* **`useSignAndExecuteTransactionBlock`**: O "gerente de entregas". Um hook que pega a transação que montamos, mostra para o usuário aprovar na carteira, e se aprovado, envia para a blockchain.