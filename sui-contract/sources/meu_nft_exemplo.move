_
module meu_nft_exemplo::meu_nft {

    use sui::display;
    use std::string::{Self, String};
    use sui::package::{Self, Publisher};

    // --- Definição do Objeto NFT ---

    /// One-Time Witness para o Publisher
    public struct MEU_NFT has drop {}

    /// A estrutura principal do nosso NFT.
    public struct MeuNFT has key, store {
        id: UID,
        name: String,
        description: String,
        /// URL para a imagem do NFT (idealmente, um link de gateway IPFS https://).
        url: String
    }

    // --- Funções de Inicialização ---

    fun init(otw: MEU_NFT, ctx: &mut TxContext) {
        // Cria um novo objeto Publisher para o nosso tipo `MeuNFT`.
        let publisher = package::claim(otw, ctx);
        // Transfere o Publisher para a pessoa que está publicando o contrato.
        // Isso garante que apenas o criador do contrato possa mudar como os NFTs são exibidos.
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    // --- Funções Públicas (Entry Functions) ---

    /// Cria ("minta") uma nova instância do nosso NFT e a envia para o chamador.
    entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = MeuNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: string::utf8(url),
        };
        // Transfere o NFT recém-criado para a carteira que chamou esta função.
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    /// Cria e publica o objeto `Display` para o tipo `MeuNFT`.
    /// Esta função deve ser chamada APENAS UMA VEZ após a publicação do contrato.
    /// Requer o objeto `Publisher` (que foi obtido no `init`) como prova de autoridade.
    entry fun create_display(
        publisher: &Publisher,
        ctx: &mut TxContext
    ) {
        // Cria um novo objeto Display.
        let mut display = display::new_with_fields<MeuNFT>(
            publisher,
            // Nomes dos campos que aparecerão no Display.
            // Estes são os nomes que as carteiras e exploradores vão ler.
            vector[
                string::utf8(b"name"),
                string::utf8(b"description"),
                string::utf8(b"image_url") // Nome padrão para a imagem!
            ],
            // Valores para os campos do Display.
            // Usamos "placeholders" (variáveis) que apontam para os campos do nosso struct `MeuNFT`.
            // "{name}" no display vai mostrar o valor do campo "name" do NFT.
            // "{url}" no display vai mostrar o valor do campo "url" do NFT.
            vector[
                string::utf8(b"{name}"),
                string::utf8(b"{description}"),
                string::utf8(b"{url}") // Mapeamos nosso campo 'url' para o 'image_url' do display!
            ],
            ctx
        );

        // Atualiza a versão do display para torná-lo ativo.
        display::update_version(&mut display);
        // Transfere o objeto Display para o sender.
        transfer::public_transfer(display, tx_context::sender(ctx));
    }
}