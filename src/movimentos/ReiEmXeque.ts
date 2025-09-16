import { movimentoValidoBispo } from "./Bispo";
import { movimentovalidoCavalo } from "./Cavalo";
import { movimentoValidoRainha } from "./Rainha";
import { movimentovalidoTorre } from "./Torre";

export function reiEmXeque(

    tabuleiro: (string | null)[][],
    ehBranco: boolean

): boolean {

    const rei = ehBranco ? 'K' : 'k';
    let reiPos: {linha: number; coluna: number} | null = null; // posicao do rei 

    //Encontrar o rei no tabuleiro
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna <8; coluna++) {
            if( tabuleiro[linha][coluna] === rei) {
                reiPos = {linha, coluna};
                break;
            }
        }
    }

    if(!reiPos) return false; // rei nao encontrado (evitar erro)

    //Verificar se alguma peça inimiga pode atacar o rei

    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {

            //percorre  todo o tabuleiro e procura uma peça, se nao tiver peça ele continua ate achar uma

            const peca = tabuleiro[linha][coluna];
            if (!peca) continue;

            // vc é uma peça branca? se sim, a peça encontrada é igual a true, senao é igual a false

            const inimigo = ehBranco ? peca === peca.toLowerCase() : peca === peca.toUpperCase();

            // se o inimigo é false continue para a proxima peça

            if(!inimigo) continue;

            const tipo = peca.toLowerCase(); //aqui ele coloca como letra minuscula, para igualar todos os casos, vc sendo preta ou branca

            const origem = { linha, coluna }; //Marcará o local de origem do inimigo, para testar seu movimento e ver se tem xeque

            let podeAtacar = false; //variavel base para permirtir ou nao o movimento

            switch (tipo) { //de acordo com a letra, ele testará um movimento diferente

                case 'p':{

                    const direcao = peca === peca.toUpperCase() ? -1 : 1;

                    if(

                        reiPos.linha === linha + direcao && //Se a posição do rei linha é igual a linha mais a direção de ataque (diagonal)
                        Math.abs(reiPos.coluna - coluna) === 1 //e se a posicao do rei coluna menos coluna é igual a 1 

                    ) {

                        podeAtacar = true; //entao o xeque é real

                    }
                    break;

                }

                case 't':{
                    podeAtacar = movimentovalidoTorre(origem, reiPos, peca, tabuleiro); //Se o movimento da peça pode alcancar o rei entao o resultado é true
                    break;
                }

                case 'c':{
                    podeAtacar = movimentovalidoCavalo(origem, reiPos, peca, tabuleiro); //Se o movimento da peça pode alcancar o rei entao o resultado é true
                    break;
                }

                case 'b':{
                    podeAtacar = movimentoValidoBispo(origem, reiPos, peca, tabuleiro); //Se o movimento da peça pode alcancar o rei entao o resultado é true
                    break;
                }

                case 'q':{
                    podeAtacar = movimentoValidoRainha(origem, reiPos, peca, tabuleiro); //Se o movimento da peça pode alcancar o rei entao o resultado é true
                    break;
                }

                case 'k':
                    break;

            }

            if (podeAtacar) return true; //e entao se o pode atacar é true retorna true
        }
    }

    return false //se nada disso acontecer entao retorne false
}