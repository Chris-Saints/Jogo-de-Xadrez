import type { PecaAtual } from "../utils/utils";

export function movimentovalidoCavalo(

    origem: PecaAtual,
    destino: {linha: number, coluna: number},
    peca: string,
    tabuleiro: (string | null)[][]

): boolean {

    const deltaLinha = destino.linha - origem.linha;
    const deltaColuna = destino.coluna - origem.coluna;

    const ehBranco = peca === peca.toUpperCase();

    const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna];

    const movimentoEmLVertical = Math.abs(deltaLinha) === 2 && Math.abs(deltaColuna) === 1;
    const movimentoEmLHorizontal = Math.abs(deltaLinha) === 1 && Math.abs(deltaColuna) === 2

    if (movimentoEmLVertical || movimentoEmLHorizontal) {

        if(!haPecaNoDestino) return true

        if(haPecaNoDestino) {
            
            const pecaAlvo = haPecaNoDestino === haPecaNoDestino.toUpperCase();

            return ehBranco !== pecaAlvo;
        }
    }

    return false

}