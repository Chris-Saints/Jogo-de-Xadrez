import type { PecaAtual } from "../utils/utils";

export function movimentoValidoRainha(

    origem: PecaAtual,
    destino: {linha: number, coluna: number},
    peca: string,
    tabuleiro: (string | null)[][]
) {

    const deltaLinha = destino.linha - origem.linha;
    const deltaColuna = destino.coluna - origem.coluna; 

    const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna];

    const ehBranco = peca === peca.toUpperCase();


    const movimentoDiagonal = Math.abs(deltaLinha) === Math.abs(deltaColuna);
    const movimentoVertical = deltaColuna === 0;
    const movimentoHorizontal = deltaLinha === 0;

    if(!movimentoDiagonal && !movimentoHorizontal && !movimentoVertical) return false

    if(movimentoDiagonal) {

        const passoLinha = deltaLinha > 0 ? 1 : -1;
        const passoColuna = deltaColuna > 0 ? 1 : -1;

        let linha = origem.linha + passoLinha;
        let coluna = origem.coluna + passoColuna;

        while(linha !== destino.linha && coluna !== destino.coluna) {
            if(tabuleiro[linha][coluna]) return false;
            linha += passoLinha
            coluna += passoColuna

        }
    

    } else if(movimentoVertical) {

        const passo = deltaLinha > 0 ? 1 : -1; //Precisa desse passo para caso ele va para uma direcao com numeros positivos ou negativos, precisa disso para fazer a conta dos passos dados

        for ( let i = origem.linha + passo; i !== destino.linha; i += passo) { //Passa por cada casa ate o destino e verifica se existem alguma peça no meio

            if (tabuleiro[i][origem.coluna]) return false // se existir ele retorna false e nao deixa jogar

        }

    } else if(movimentoHorizontal) {

        const passo = deltaColuna > 0 ? 1 : -1;

        for (let i = origem.coluna + passo; i !== destino.coluna; i += passo) {

            if (tabuleiro[origem.linha][i]) return false; // tem obstáculo
        }
    }

    if(!haPecaNoDestino) return true;

    const pecaAlvo = haPecaNoDestino === haPecaNoDestino.toUpperCase()

    return ehBranco !== pecaAlvo
}