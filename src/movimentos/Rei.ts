import type { EstadoRoque } from "../components/ChessBoard";
import { reiEmXeque } from "./ReiEmXeque";

export function movimentoValidoRei(

    origem: {linha:number, coluna: number},
    destino: {linha: number, coluna: number},
    peca: string,
    tabuleiro: (string | null)[][],
    estadoRoque: EstadoRoque

): boolean | "roque-curto" | "roque-longo" {

    const deltaLinha = destino.linha - origem.linha;
    const deltaColuna = destino.coluna - origem.coluna;
    const ehBranco = peca === peca.toUpperCase();
    const linha = ehBranco ? 7 : 0;


    const DistanciaMaxima = Math.max(Math.abs(deltaLinha), Math.abs(deltaColuna)); //Limita a distancia maxima que o rei pode andar em 1

    if (DistanciaMaxima <= 1) { //Se a distancia for menor ou igual a 1 entao:

        const novaMatriz = tabuleiro.map((l) => [...l]); //Cria uma copia do tabuleiro
        novaMatriz[origem.linha][origem.coluna] = null; //limpa a casa origem
        novaMatriz[destino.linha][destino.coluna] = peca; //coloca a peca no destino

        if (reiEmXeque(novaMatriz, ehBranco)) return false; //Se a função de rei em xeque der true entao retorne false. negue o movimento

        const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna]; //pega a informacao se tem alguem na casa de destino

        if (!haPecaNoDestino) return true; //se nao houver entao permita o movimento

        const pecaAlvo = haPecaNoDestino === haPecaNoDestino.toUpperCase()

        return ehBranco !== pecaAlvo

    }

    //ROQUE CURTO

    if(deltaLinha === 0 && deltaColuna === 2) {

        if(ehBranco && (estadoRoque.reiBrancoMovido || estadoRoque.torreBrancaDireitaMovida)) return false

        if(!ehBranco && (estadoRoque.reiPretoMovido || estadoRoque.torrePretaDireitaMovida)) return false

        if(tabuleiro[linha][5] || tabuleiro[linha][6]) return false

        //Simulacao de xeque

        const simulacao1 = tabuleiro.map((l) => [...l]);
        simulacao1[linha][4] = null;
        simulacao1[linha][5] = peca;

        if(reiEmXeque(simulacao1, ehBranco)) return false;

                
        const simulacao2 = tabuleiro.map((l) => [...l]);
        simulacao2[linha][4] = null;
        simulacao2[linha][6] = peca;

        if (reiEmXeque(simulacao2, ehBranco)) return false;

        return "roque-curto";
        
    }

    //ROQUE LONGO

    if(deltaLinha === 0 && deltaColuna === -2) {
        if(ehBranco && (estadoRoque.reiBrancoMovido || estadoRoque.torreBrancaEsquerdaMovida)) return false

        if(!ehBranco && (estadoRoque.reiPretoMovido || estadoRoque.torrePretaEsquerdaMovida)) return false

        if(tabuleiro[linha][1] || tabuleiro[linha][2] || tabuleiro[linha][3]) return false

        const simulacao1 = tabuleiro.map((l) => [...l]);
        simulacao1[linha][4] = null;
        simulacao1[linha][5] = peca;

        const simulacoes = [4, 3, 2];

        for (const colunaSimulada of simulacoes) {
            const simulado = tabuleiro.map((l) => [...l]);
            simulado[linha][4] = null;
            simulado[linha][colunaSimulada] = peca;

            if (reiEmXeque(simulado, ehBranco)) return false;
        }

        return "roque-longo"
    }

    return false
    
}
