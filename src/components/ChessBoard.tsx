import { useEffect, useState} from "react";
import { movimentoValidoPeao } from "../movimentos/Peao";
import { movimentovalidoTorre } from "../movimentos/Torre";
import { movimentoValidoBispo } from "../movimentos/Bispo";
import { movimentoValidoRainha } from "../movimentos/Rainha";
import { movimentoValidoRei } from "../movimentos/Rei";
import { movimentovalidoCavalo } from "../movimentos/Cavalo";
import { reiEmXeque } from "../movimentos/ReiEmXeque";
import { xequeMate } from "../funcionalidades/XequeMate";

import style from "./ChessBoard.module.css"


//interface base para o roque funcionar
export interface EstadoRoque {
    reiBrancoMovido: boolean;
    torreBrancaDireitaMovida: boolean;
    torreBrancaEsquerdaMovida: boolean;
    reiPretoMovido: boolean;
    torrePretaDireitaMovida: boolean;
    torrePretaEsquerdaMovida: boolean;
}

//Para os numeros e letras laterais
const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numeros = ['8', '7', '6', '5', '4', '3', '2', '1'];




//Tipo para a cor escolhida
type Props = {
    corJogador: string
}

//Variavel que muda as letras colocadas pelas Peças
const pecaUnicode: Record<string, string> = {
    P: '♙',
    T: '♖',
    C: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
    p: '♟︎',
    t: '♜',
    c: '♞',
    b: '♝',
    q: '♛',
    k: '♚'
}

//Variavel que guarda as posicoes iniciais do tabuleiro
const posicoesIniciais: (string | null)[][] = [
    ['t', 'c', 'b', 'q', 'k', 'b', 'c', 't'], //Pretas
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], //Pretas
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], //Brancas
    ['T', 'C', 'B', 'Q', 'K', 'B', 'C', 'T'], //Brancas
];


export function ChessBoard({ corJogador }: Props) {

    const letrasVisiveis = letras
    const numerosVisiveis = corJogador === 'preto' ? [...numeros].reverse() : numeros;

    //Variavel que dita a vez do turno
    const [vezBrancas, setVezBracas] = useState(true);

    //Variavel que sera mudada constantemente durante o jogo.  
    const [tabuleiro, setTabuleiro] = useState<(string | null)[][]>(posicoesIniciais); 

    //Variavel que guarda a informação da peça selecionada
    const [selecionado, setSelecionado] = useState<{linha: number, coluna: number} | null>(null);

    const[mensagemVitoria, setMensagemVitoria] = useState<string | null>(null);

    //Variavel que guardará as informões se ainda é permitido o roque ou nao
    const [estadoRoque, setEstadoRoque] = useState<EstadoRoque>({
        reiBrancoMovido: false,
        torreBrancaDireitaMovida: false,
        torreBrancaEsquerdaMovida: false,
        reiPretoMovido: false,
        torrePretaDireitaMovida: false,
        torrePretaEsquerdaMovida: false,
    });

    //Variavel que guarda a informção do peao que chegou até a ultima casa e pode ser promovido
    const [promocaoPendente, setPromocaoPendente] = useState<{
        linha: number;
        coluna: number;
        ehBranco: boolean;
    } | null>(null);

    //Variavel que guarda a informação se o rei esta ameacado ou nao
    const [reiAmeacado, setReiAmeacado] = useState<{
        linha: number;
        coluna: number;
    } | null>(null);



    //a const ordemDasLinhas serve para inverter o tabuleiro caso a cor escolhida for o preto utilizando as funcoes .slice().reverse() sendo slice para criar uma copia do array, para n modifica-lo diretamente e reverse para inverter seus valores
    const ordemDasLinhas = corJogador === 'preto'
    ? Array.from({ length: 8}, (_, i) => i).slice().reverse()
    : Array.from({ length: 8}, (_, i) => i);// Usamos um array.from para criar uma lista de 8 elementos representando as linhas

    //acha o rei em xeque. verifica se esta em situacao de xeque e pinta a casa
    useEffect(() =>{
        const novaMatriz = tabuleiro.map((l) => [...l]);
        const encontrarRei = (ehBranco: boolean) => {
            const rei = ehBranco ? 'K' : 'k' ;
            for (let linha = 0; linha < 8; linha++) {
                for (let coluna = 0; coluna < 8; coluna++) {
                    if (novaMatriz[linha][coluna] === rei){
                        return { linha, coluna }
                    }; 
                 }
            }

            return null;
        };

        const reiBranco = encontrarRei(true);
        if(reiBranco && reiEmXeque(tabuleiro, true)) {
            setReiAmeacado(reiBranco);
            return;
        }

        const reiPreto = encontrarRei(false);
        if(reiPreto && reiEmXeque(tabuleiro, false)) {
            setReiAmeacado(reiPreto);
            return;
        }

        setReiAmeacado(null);
    }, [tabuleiro]);


    //Const que sera renderizada
    const casas = ordemDasLinhas.map((linha) => 
        
        //O array.from({length: 8}) Cria um array com 8 posicoes vazias. O segundo argumento é uma funcao que recebe (_,i), sendo _ o valor  (que nesse caso é undefined) e o i sendo i indice ou seja se 0,7. Assim conseguindo controlar o numero de elementos e acessar os indices para crias as posicoes do tabuleiro

        Array.from({ length: 8 }, (_, coluna) => { //E para cada linha criamos uma outra lista de 8 elementos representando as colunas
        
            //Em cada linha/coluna a const casas vai criar uma div com uma key que tera valor (linha-coluna) e dentro dessa div renderizara algo
            // A `key` é importante no React para identificar elementos únicos quando se trabalha com listas
            const peca = tabuleiro[linha][coluna]

            return(

            <div 
                onClick={() => { //Ao clicar

                    console.log("Mensagem de vitória:", mensagemVitoria);

                    if (mensagemVitoria) return;

                    const casaClicada = {linha, coluna}; //Guarda a informação do destino clicado da peça
                    const peca = tabuleiro[linha][coluna]; //Guarda a informação atual da peça
                    
                    if (!selecionado) { // Se ainda não há peça selecionada

                        if (peca) { //e há peça clicada anteriormente

                            const ehBranco = peca === peca.toUpperCase();

                            if (ehBranco !== vezBrancas) { //Verifica se é a vez da branca ou pretas

                                setSelecionado(null); //esvazia se nao é a vez
                                return;

                            } else {

                                setSelecionado(casaClicada) //Salva a origem da peça

                            }

                        }

                    } else {

                        const destino = casaClicada

                        const pecaSelecionada = tabuleiro[selecionado.linha][selecionado.coluna]; //Guarda a letra da peça selecionada
                        const tipo = pecaSelecionada?.toLowerCase(); //Verifica qual peça foi selecionada, diminuindo a letra e deixando todas iguais para verificacao

                        let podeMover = false; //Valor que ira permitir ou nao o movimento

                        if (tipo === 'p') { //se for um peao:
                            //Moverá de acordo com o resultado da função que verificará se há casas vazias ou nao
                            podeMover = movimentoValidoPeao(selecionado, destino, pecaSelecionada!, tabuleiro); 

                            //Dependendo da letra, se o peao chegou na linha final, variavel vira true
                            const chegouNoFim = 
                            (pecaSelecionada === 'P' && linha === 0) ||
                            (pecaSelecionada === 'p' && linha === 7); 

                            if(chegouNoFim) { //se chegou no fim for true entao:
                                setPromocaoPendente({ //Salva as propriedades
                                    linha,
                                    coluna,
                                    ehBranco: pecaSelecionada === 'P' //A peça é preta ou branca
                                });

                                const novaMatriz = tabuleiro.map((l) => [...l]); //Faz a copia do tabuleiro

                                novaMatriz[linha][coluna] = pecaSelecionada!; //A ultima casa recebe a peça selecionada
                                novaMatriz[selecionado.linha][selecionado.coluna] = null; //Apaga a casa anterior

                                setTabuleiro(novaMatriz); //salva a nova copia no tabuleiro
                                setSelecionado(null); //Limpa o selecionado
                                return;
                            }
                        }

                        if (tipo === 't') { //Se for uma torre entao:
                            //Dependendo da funcao de validacao tera um resutlado true ou false
                            podeMover = movimentovalidoTorre(selecionado, destino, pecaSelecionada!, tabuleiro); 
                        }

                        if (tipo === 'b') {
                            //Dependendo da funcao de validacao tera um resutlado true ou false
                            podeMover = movimentoValidoBispo(selecionado, destino, pecaSelecionada!, tabuleiro); 
                        }

                        if (tipo === 'c') {
                            //Dependendo da funcao de validacao tera um resutlado true ou false
                            podeMover = movimentovalidoCavalo(selecionado, destino, pecaSelecionada!, tabuleiro); 
                        }

                        if (tipo === 'q') {
                            //Dependendo da funcao de validacao tera um resutlado true ou false
                            podeMover = movimentoValidoRainha(selecionado, destino, pecaSelecionada!, tabuleiro); 
                        }

                        if (tipo === 'k') {
                            //Dependendo da funcao de validacao tera um resutlado true ou false
                            const resultado = movimentoValidoRei(selecionado, destino, pecaSelecionada!, tabuleiro, estadoRoque);  
                            
                            if(resultado === true) {
                                podeMover = true;
                            }

                            //ROQUE CURTO

                            if (resultado === "roque-curto") {
                                podeMover = true;

                                //faz copia do tabuleiro
                                const novaMatriz = tabuleiro.map((l) => [...l]); 

                                //MOVER REI
                                novaMatriz[destino.linha][destino.coluna] = pecaSelecionada!;
                                novaMatriz[selecionado.linha][selecionado.coluna] = null;

                                //MOVER A TORRE
                                novaMatriz[destino.linha][5] = novaMatriz[destino.linha][7];
                                novaMatriz[destino.linha][7] = null;

                                setTabuleiro(novaMatriz); //Salva o novo estado


                                //Faz com que as peças ganhem o estado de movidas para nao haver outro roque
                                if (pecaSelecionada === 'K') {
                                    setEstadoRoque((r) => ({
                                        ...r,
                                        reiBrancoMovido: true,
                                        torreBrancaDireitaMovida: true
                                    }));

                                } else {
                                    setEstadoRoque((r) => ({
                                        ...r,
                                        reiPretoMovido: true,
                                        torrePretaDireitaMovida: true
                                    }));
                                }

                                setSelecionado(null); //Limpa o estado de selecionado
                                return;
                            
                            }

                            //ROQUE LONGO

                            if (resultado === "roque-longo") {
                                podeMover = true;
                                const novaMatriz = tabuleiro.map((l) => [...l]);

                                // Mover o rei
                                novaMatriz[destino.linha][destino.coluna] = pecaSelecionada!;
                                novaMatriz[selecionado.linha][selecionado.coluna] = null;

                                // Mover a torre
                                novaMatriz[destino.linha][3] = novaMatriz[destino.linha][0];
                                novaMatriz[destino.linha][0] = null;

                                setTabuleiro(novaMatriz);

                                // Atualiza estado
                                if (pecaSelecionada === 'K') {
                                    setEstadoRoque((r) => ({
                                        ...r,
                                        reiBrancoMovido: true,
                                        torreBrancaEsquerdaMovida: true
                                    }));
                                } else {
                                    setEstadoRoque((r) => ({
                                        ...r,
                                        reiPretoMovido: true,
                                        torrePretaEsquerdaMovida: true
                                    }));
                                }

                                setSelecionado(null);
                                return;
                            }
                        
                        }


                        if (podeMover) { //Se pode mover for true entao:

                            const novaMatriz = tabuleiro.map((l) => [...l]) // Cópia da matriz
                            novaMatriz[linha][coluna] = tabuleiro[selecionado.linha][selecionado.coluna] // Move peça
                            novaMatriz[selecionado.linha][selecionado.coluna] = null // Apaga a original

                            const ehBranco = pecaSelecionada === pecaSelecionada?.toUpperCase(); //Verifica qual a cor da peça


                            if (pecaSelecionada === 'K') {
                                setEstadoRoque((r) => ({...r, reiBrancoMovido: true}));
                            }else {
                                setEstadoRoque((r) => ({...r, reiPretoMovido: true}));
                            }
                            

                            // Atualiza estadoRoque se a torre foi movida
                            if (pecaSelecionada === 'T') {
                                if (selecionado.coluna === 0 && selecionado.linha === 7) {
                                    setEstadoRoque((r) => ({ ...r, torreBrancaEsquerdaMovida: true }));
                                }
                                if (selecionado.coluna === 7 && selecionado.linha === 7) {
                                    setEstadoRoque((r) => ({ ...r, torreBrancaDireitaMovida: true }));
                                }
                            }
                            if (pecaSelecionada === 't') {
                                if (selecionado.coluna === 0 && selecionado.linha === 0) {
                                    setEstadoRoque((r) => ({ ...r, torrePretaEsquerdaMovida: true }));
                                }
                                if (selecionado.coluna === 7 && selecionado.linha === 0) {
                                    setEstadoRoque((r) => ({ ...r, torrePretaDireitaMovida: true }));
                                }
                            }

                            //Não permite a movimentação do rei se o destino der em xeque
                            if (reiEmXeque(novaMatriz, ehBranco)) { 
                                console.log("movimento deixaria o rei em xeque");
                                setSelecionado(null);
                                return;
                            }


                            setTabuleiro(novaMatriz)  // Atualiza o estado do tabuleiro

                            //Se houver xeque mate 
                            if(xequeMate(novaMatriz, !vezBrancas)) {

                                const vencedor = vezBrancas ? 'Brancas' : 'Pretas';

                                setMensagemVitoria(`${vencedor} venceram por xeque-mate!`); //Mostra a mensagem
                                return;
                            }
                            setVezBracas((v) => !v)
                           
                        }
                        
                        setSelecionado(null)  // Limpa a variavel
                    }
                }}
                key={`${linha}-${coluna}`} 
                style={{
                    width: '60px', 
                    height: '60px', 
                    backgroundColor:
                        reiAmeacado?.linha === linha && reiAmeacado?.coluna === coluna
                        ? 'red'
                        : (linha + coluna) % 2 === 0
                        ? 'var(--gray-100)'
                        : 'var(--gray-600)',
                    border: selecionado?.linha === linha && selecionado?.coluna === coluna ? '2px solid yellow' : '1.5px solid black',
                    fontSize: '40px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    lineHeight: '60px',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            > 
                {peca ? pecaUnicode[peca] : ''}
            </div>
            );

        })
    )



    return (
        <div style={{color: "black", position: 'relative', width: 540, height: 540, display: 'grid', gridTemplate: 'auto 1fr auto / auto 1fr auto' }}>
            
            {/* Letras no topo */}
            <div />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 60px)', textAlign: 'center', paddingBottom: 10 }}>
            {letrasVisiveis.map((letra) => (
                <div key={letra} style={{ color: "white", fontWeight: 'bold' }}>{letra}</div>
            ))}
            </div>
            <div />

            {/* Números à esquerda + Tabuleiro + à direita */}
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(8, 60px)', textAlign: 'center' }}>
            {numerosVisiveis.map((num) => (
                <div key={num} style={{ color: "white", paddingRight: 10, fontWeight: 'bold', lineHeight: '60px' }}>{num}</div>
            ))}
            </div>

            <div style={{ position: 'relative', width: 480, height: 480 }}>
                


            <div
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 60px)',
                gridTemplateRows: 'repeat(8, 60px)'
                }}
            >
                
                {casas.flat()}
            </div>

            {mensagemVitoria && (
                    <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 20,
                        textAlign: 'center',
                        padding: '1rem'
                    }}
                    >
                    {mensagemVitoria}
                    </div>
                )}

            {promocaoPendente && (
                <div
                    className={style.duvidaDois}
                style={{
                    position: 'absolute',
                    top: promocaoPendente.linha * 60 + 60,
                    left: promocaoPendente.coluna * 60,
                    display: 'flex',
                    background: '#f0f0f0',
                    border: '2px solid black',
                    zIndex: 10,
                }}
                >
                {['q', 't', 'c', 'b'].map((tipo) => {
                    const peca = promocaoPendente.ehBranco ? tipo.toUpperCase() : tipo;

                    return (
                    <div
                        className={style.duvida}
                        key={tipo}
                        onClick={() => {
                        const novaMatriz = tabuleiro.map((l) => [...l]);
                        novaMatriz[promocaoPendente.linha][promocaoPendente.coluna] = peca;
                        setTabuleiro(novaMatriz);
                        setPromocaoPendente(null);
                        }}
                    >
                        {pecaUnicode[peca]}
                    </div>
                    );
                })}
                </div>
            )}
            </div>



        </div>
    );
 //retorna uma div que contem todas as casas do tabuleiro -> casas.flat() foi usado para simplificar o Array[Array[div]] para Array[div], pq o React precisa de um array simples para renderizar corretamente
}