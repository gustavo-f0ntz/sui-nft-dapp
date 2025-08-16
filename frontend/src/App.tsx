
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Box, Flex, Heading, Button } from '@radix-ui/themes';
import { Transaction } from '@mysten/sui/transactions'; 
import './App.css'; 

function App() {
  const currentAccount = useCurrentAccount();
  
  const { mutate: signAndExecuteTransaction, isPending } = useSignAndExecuteTransaction();

  function handleMint() {
   
    const txb = new Transaction();

    txb.moveCall({
      target: `0xSEU_PACKAGE_ID::meu_nft::mint`,
      arguments: [
        txb.pure.string('My First NFT'),
        txb.pure.string('Created with Sui blockchain technology'),
        txb.pure.string('https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400'),
      ],
    });

    signAndExecuteTransaction(
      {
   
        transaction: txb,
      },
      {
        onSuccess: (result: { digest: string }) => { 
          console.log('NFT mintado com sucesso! Digest:', result.digest);
          alert(`NFT mintado com sucesso! Veja no explorer: https://suiscan.xyz/devnet/tx/${result.digest}`);
        },
        onError: (error: Error) => {
          console.error('Erro ao mintar o NFT', error);
          alert(`Erro ao mintar o NFT: ${error.message}`);
        }
      },
    );
  }

  return (
    <>
      <Flex
        position="sticky" px="4" py="2" justify="between"
        className="app-header" 
      >
        <Box><Heading>dApp de Mint NFT</Heading></Box>
        <Box><ConnectButton /></Box>
      </Flex>

      <main className="app-main">
        {currentAccount && (
          <Box>
            <Heading as="h2" size="4">Carteira Conectada</Heading>
            <p>Endereço: {currentAccount.address}</p>
            <hr className="app-divider" />

            <Button size="3" onClick={handleMint} disabled={isPending}>
              {isPending ? 'Mintando...' : 'Mintar NFT Agora!'}
            </Button>
          </Box>
        )}
      </main>
    </>
  );
}

export default App;