//Para os numeros e letras laterais
export const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const numeros = ['8', '7', '6', '5', '4', '3', '2', '1'];


//Variavel que muda as letras colocadas pelas Peças
export const pecaUnicode: Record<string, string> = {
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
export const posicoesIniciais: (string | null)[][] = [
    ['t', 'c', 'b', 'q', 'k', 'b', 'c', 't'], //Pretas
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], //Pretas
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], //Brancas
    ['T', 'C', 'B', 'Q', 'K', 'B', 'C', 'T'], //Brancas
];

//interface base para o roque funcionar
export interface EstadoRoque {
    reiBrancoMovido: boolean;
    torreBrancaDireitaMovida: boolean;
    torreBrancaEsquerdaMovida: boolean;
    reiPretoMovido: boolean;
    torrePretaDireitaMovida: boolean;
    torrePretaEsquerdaMovida: boolean;
}









export interface Promocao {
    linha: number,
    coluna: number,
    ehBranco: boolean,
}

export interface PecaAtual {
    linha: number,
    coluna: number
}