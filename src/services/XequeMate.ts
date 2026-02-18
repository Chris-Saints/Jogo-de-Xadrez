import { movimentoValidoBispo } from "./Bispo";
import { movimentovalidoCavalo } from "./Cavalo";
import { movimentoValidoPeao } from "./Peao";
import { movimentoValidoRainha } from "./Rainha";
import { movimentoValidoRei } from "./Rei";
import { reiEmXeque } from "./ReiEmXeque";
import { movimentovalidoTorre } from "./Torre";

export function xequeMate(tabuleiro: (string | null)[][], ehBranco: boolean): boolean {

    //Se o rei nao estiver em xeque, entao nao pode ser xeque mate
    if(!reiEmXeque(tabuleiro,ehBranco)) return false; 

    //Para cada peça do jogador
    for (let linha =0; linha < 8; linha++){
        for(let coluna = 0; coluna < 8; coluna++) {

            const peca = tabuleiro[linha][coluna];
            if(!peca) continue;

            const corPeca = peca === peca.toUpperCase();
            if(corPeca !== ehBranco) continue;

           

            const origem = { linha, coluna  };

            for (let l2 = 0; l2 < 8; l2++) {
                for ( let c2 = 0; c2 < 8; c2++) {

                    const destino = {linha: l2, coluna: c2};

                   if(destino.linha === origem.linha && destino.coluna === origem.coluna) continue;

                    const tipo = peca.toLowerCase();
                    let valido = false;

                    //Verifica se o movimento é válido para cada peça do tabuleiro
                    try {
                        switch(tipo) {
                            case 'p':
                            valido = movimentoValidoPeao(origem, destino, peca, tabuleiro);
                            break;
                            case 't':
                            valido = movimentovalidoTorre(origem, destino, peca, tabuleiro);
                            break;
                            case 'b':
                            valido = movimentoValidoBispo(origem, destino, peca, tabuleiro);
                            break;
                            case 'c':
                            valido = movimentovalidoCavalo(origem, destino, peca, tabuleiro);
                            break;
                            case 'q':
                            valido = movimentoValidoRainha(origem, destino, peca, tabuleiro);
                            break;
                            case 'k':
                            valido = movimentoValidoRei(origem, destino, peca, tabuleiro, {
                                reiBrancoMovido: true,
                                torreBrancaDireitaMovida: true,
                                torreBrancaEsquerdaMovida: true,
                                reiPretoMovido: true,
                                torrePretaDireitaMovida: true,
                                torrePretaEsquerdaMovida: true,
                            }) === true;
                            break;
                        }
                    } catch(e) {
                    console.warn("Erro ao validar movimento:", e);
                    }

                    if(valido) {
                        // simula movimento
                        const tabuleiroSimulado = tabuleiro.map(l => [...l]);
                        tabuleiroSimulado[destino.linha][destino.coluna] = peca;
                        tabuleiroSimulado[origem.linha][origem.coluna] = null;

                        if(!reiEmXeque(tabuleiroSimulado, ehBranco)) {
                            return false;
                        }
                    }

                    
                }
            }
        
        }
    }

    //Nenhum movimento possivel do xeque

    return true;
}