import type { PecaAtual } from "../utils/utils";

interface RoqueProps{
    destino: PecaAtual,
    selecionado: PecaAtual,
    pecaSelecionada: string | null,
    tabuleiro: (string | null)[][],
    resultado: string | boolean
}

export function ValidaçãoRoque({destino, selecionado, pecaSelecionada, tabuleiro, resultado}: RoqueProps ) {

    if(resultado === "roque-curto") {

    
        //faz copia do tabuleiro
        const novaMatriz = tabuleiro.map((l) => [...l]); 

        //MOVER REI
        novaMatriz[destino.linha][destino.coluna] = pecaSelecionada!;
        novaMatriz[selecionado.linha][selecionado.coluna] = null;

        //MOVER A TORRE
        novaMatriz[destino.linha][5] = novaMatriz[destino.linha][7];
        novaMatriz[destino.linha][7] = null;

        return novaMatriz
    }
}


