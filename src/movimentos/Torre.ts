export function movimentovalidoTorre(

    origem: {linha: number, coluna: number},
    destino: {linha: number, coluna: number},
    peca: string,
    tabuleiro: (string | null)[][]

): boolean {

    const deltaLinha = destino.linha - origem.linha;
    const deltaColuna = destino.coluna - origem.coluna;

    const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna];

    const ehBranca = peca === peca.toUpperCase();

    if(deltaColuna === 0) {

        const passo = deltaLinha > 0 ? 1 : -1; //Precisa desse passo para caso ele va para uma direcao com nnumeros positivos ou negativos, precisa disso para fazer a conta dos passos dados

        for ( let i = origem.linha + passo; i !== destino.linha; i += passo) { //Passa por cada casa ate o destino e verifica se existem alguma peça no meio

            if (tabuleiro[i][origem.coluna]) return false // se existir ele retorna false e nao deixa jogar

        }

    } else if(deltaLinha === 0) {

        const passo = deltaColuna > 0 ? 1 : -1;

        for (let i = origem.coluna + passo; i !== destino.coluna; i += passo) {

            if (tabuleiro[origem.linha][i]) return false; // tem obstáculo
        }
    } else {

        return false // se nao for nem linha nem coluna é movimento invalido da torre

    }

    if(!haPecaNoDestino) return true // se chegou aqui o caminho esta livre

    const pecaAlvo = haPecaNoDestino === haPecaNoDestino.toUpperCase()

    return ehBranca !== pecaAlvo
}