export function movimentoValidoPeao (

    origem: {linha: number, coluna:number}, //Representa a posicao de origem da peça
    destino: {linha: number, coluna: number}, //Representa a posicao onde o jogador quer mover a peça
    peca: string, //Representa a Letra da Pessa
    tabuleiro: (string | null)[][] // Representa a matriz com o estado atual do jogo. Cada casa podendo conter null ou uma letra

): boolean {

    //Serve para saber quantas casas a peça ira se mover
    const deltaLinha = destino.linha - origem.linha; //+1 ou -1 depependendo da direção
    const deltaColuna = destino.coluna - origem.coluna; //0 se for movimento reto ou +-1 se for diagonal

    const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna]; // Serve para ter a informacao se existe alguma peça na casa de destino ou se ela é null (captura / movimento livre)

    const ehBranco = peca === peca.toUpperCase(); //uma variavel que serve para vverificar qual a cor da peça. vira um boolean baseado na comparação da peca em questao se ela é maiuscula ou nao

    const direcao = ehBranco ? -1 : 1; //Serve para saber em qual direção cada peça vai andar. Brancos para de cima pra baixo -1 e pretos de baixo para cima +1
    const linhaInicial = ehBranco ? 6 : 1; //Servira para permitir andar 2 casas

    //Movimento reto (sem captura)

    if (deltaColuna === 0) { //So poderá andar Reto de a Coluna For igual a 0

        if (deltaLinha === direcao && !haPecaNoDestino) return true //A direção e o delta serem iguais e a casa de destino estiver null

        if (deltaLinha === 2 * direcao && origem.linha === linhaInicial && !haPecaNoDestino) { //Pode andar duas casas se esta na linha inicial e as casas da frente estao vazias
                //pq esse vezes? esse vezes é para que a conta de negativo ou positivo para que as peças andem.
            const casaFrente = tabuleiro[origem.linha + direcao][origem.coluna] //Acessa a informacao da casa de dstino e verifica se ele ja tem peça ou nao

            return !casaFrente //Para que aqui se ele nao tiver peça ou seja null, inverta seu valor e retorne true, assim fazendo o movimento acontecer
        }

    }

    //Captura em diagonal

    if(Math.abs(deltaColuna) === 1 && deltaLinha === direcao && haPecaNoDestino) { //Se delta coluna for diferente de zero e existir uma peca na casa
        //o Math.abs trasnforma todo numero em absoluto. aqui ele faz a funcao de tirar o sianl para a comparacao funcionar, pq dependendo de qual diagonal vc andar, o numero sera negativo ou positivo
        const destinoEhBranco = haPecaNoDestino === haPecaNoDestino.toUpperCase() //cria uma variavel para futura comparacao de peça se é inimiga o nao para conclusao do movimento de captura

        return ehBranco !== destinoEhBranco //Aqui é usado da comparacao se os dois forem true ele retornara true, se forem false, sera false. entao o retorno é baseado diretamente no resultado da comparacao dos dois 
    }

    return false //se nada disso acontecer entao retorne false
}