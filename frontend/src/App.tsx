
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Wallet, Coins, ImageIcon, Settings } from 'lucide-react';
import { useState } from 'react';
import './App.css';

function App() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction, isPending } = useSignAndExecuteTransaction();
  
  // Estado para o formulário de NFT
  const [nftForm, setNftForm] = useState({
    packageId: '',
    name: 'My Awesome NFT',
    description: 'Created with Sui blockchain technology',
    imageUrl: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400'
  });

  const [showForm, setShowForm] = useState(true); // Iniciar aberto para mostrar que precisa configurar

  function handleMint() {
    // Validação do Package ID
    if (!nftForm.packageId || nftForm.packageId.trim() === '') {
      alert(' Please enter your Package ID first!\n\nYou need to deploy your smart contract and get the Package ID.');
      return;
    }

    if (!nftForm.packageId.startsWith('0x') || nftForm.packageId.length < 10) {
      alert(' Invalid Package ID format!\n\nPackage ID should start with "0x" and be a valid Sui address.');
      return;
    }

    const txb = new Transaction();

    txb.moveCall({
      target: `${nftForm.packageId}::meu_nft::mint`,
      arguments: [
        txb.pure.string(nftForm.name),
        txb.pure.string(nftForm.description),
        txb.pure.string(nftForm.imageUrl),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: txb,
      },
      {
        onSuccess: (result: { digest: string }) => { 
          console.log('NFT minted successfully! Digest:', result.digest);
          alert(`NFT minted successfully! View on explorer: https://suiscan.xyz/devnet/tx/${result.digest}`);
        },
        onError: (error: Error) => {
          console.error('Error minting NFT', error);
          alert(`Error minting NFT: ${error.message}`);
        }
      },
    );
  }

  function handleInputChange(field: string, value: string) {
    setNftForm(prev => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Coins className="logo-icon icon" />
          Sui NFT dApp
        </div>
        
        {!currentAccount ? (
          <div className="header-connect-wrapper">
            <Wallet className="wallet-icon" />
            <ConnectButton />
          </div>
        ) : (
          <div className="wallet-address-header">
            {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="content">
          {/* Welcome Section */}
          <h1 className="title">Mint Your First NFT on Sui</h1>
          <p className="subtitle">
            Create unique digital assets on the Sui blockchain with just one click
          </p>

          {/* Connection or Connected State */}
          {!currentAccount ? (
            <div className="connect-card">
              <div className="connect-header">
                <Wallet className="icon icon-blue" />
                <h2 className="connect-title">Connect Your Wallet</h2>
              </div>
              <p className="connect-description">
                Connect your Sui wallet to start minting NFTs
              </p>
              <ConnectButton />
            </div>
          ) : (
            <div>
              {/* Wallet Connected Card */}
              <div className="connected-card">
                <div className="connected-header">
                  <div className="status-dot"></div>
                  <h2 className="connected-title">Wallet Connected</h2>
                </div>
                <div className="wallet-address">
                  Address: {currentAccount.address}
                </div>
              </div>

              {/* Mint NFT Card */}
              <div className="mint-card">
                <div className="mint-header">
                  <ImageIcon className="icon icon-blue" />
                  <h2 className="mint-title">Mint NFT</h2>
                  <button 
                    className="settings-button"
                    onClick={() => setShowForm(!showForm)}
                    title="Configure NFT parameters"
                  >
                    <Settings className="settings-icon" />
                  </button>
                </div>
                <p className="mint-description">
                  Create your unique NFT on the Sui blockchain
                </p>
                
                {showForm ? (
                  <div className="nft-form">
                    <div className="form-group">
                      <label className="form-label">
                         Package ID: 
                        <span className="required">*</span>
                        <small className="form-hint">Deploy your smart contract first to get this ID</small>
                      </label>
                      <input
                        type="text"
                        className={`form-input ${!nftForm.packageId ? 'form-input-required' : ''}`}
                        value={nftForm.packageId}
                        onChange={(e) => handleInputChange('packageId', e.target.value)}
                        placeholder="0x1234567890abcdef... (required)"
                      />
                      {!nftForm.packageId && (
                        <small className="form-error"> Package ID is required to mint NFTs</small>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">NFT Name:</label>
                      <input
                        type="text"
                        className="form-input"
                        value={nftForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="My Awesome NFT"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Description:</label>
                      <textarea
                        className="form-textarea"
                        value={nftForm.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your NFT..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Image URL:</label>
                      <input
                        type="url"
                        className="form-input"
                        value={nftForm.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mint-info">
                    <div className="mint-info-item">
                      <span className="mint-info-label">Name:</span>
                      <span className="mint-info-value">{nftForm.name}</span>
                    </div>
                    <div className="mint-info-item">
                      <span className="mint-info-label">Description:</span>
                      <span className="mint-info-value">{nftForm.description}</span>
                    </div>
                    <div className="mint-info-item">
                      <span className="mint-info-label">Package ID:</span>
                      <span className={`mint-info-value ${!nftForm.packageId ? 'missing-value' : ''}`}>
                        {nftForm.packageId 
                          ? `${nftForm.packageId.slice(0, 10)}...${nftForm.packageId.slice(-8)}`
                          : '❌ Not configured (click ⚙️ to set)'
                        }
                      </span>
                    </div>
                    <div className="mint-info-item">
                      <span className="mint-info-label">Network:</span>
                      <span className="mint-info-value">Devnet</span>
                    </div>
                  </div>
                )}

                <button 
                  className="mint-button"
                  onClick={handleMint} 
                  disabled={isPending || !nftForm.packageId}
                >
                  {isPending ? 'Minting...' : !nftForm.packageId ? 'Configure Package ID First' : 'Mint NFT Now!'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;