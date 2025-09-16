export function movimentoValidoBispo(

    origem: {linha:number, coluna: number},
    destino: {linha: number, coluna: number},
    peca: string,
    tabuleiro: (string | null)[][]
) {

    const deltaLinha = destino.linha - origem.linha;
    const deltaColuna = destino.coluna - origem.coluna; 

    const haPecaNoDestino = tabuleiro[destino.linha][destino.coluna];

    const ehBranco = peca === peca.toUpperCase();

    if(Math.abs(deltaLinha) === Math.abs(deltaColuna)) { // O valor dos deltas tem que ser iguais para mostrar que esta em diagonal

        //duas consts criadas para saber qual a direcao que peça ira andar

        const passoLinha = deltaLinha > 0 ? 1 : -1;
        const passoColuna = deltaColuna > 0 ? 1 : -1;

        //linha e coluna feitas para a verificação do caminho ate o destino. Se houver alguma peça no caminho, ou seja, se o valor de tabuleiro for true ele retornara false. pq o bispo nao pode pular peças

        let linha = origem.linha + passoLinha;
        let coluna = origem.coluna + passoColuna;

        while(linha !== destino.linha && coluna !== destino.coluna) { //enquanto linha diferente de linha do destino  e coluna diferente de coluna do destino faça:
            if(tabuleiro[linha][coluna]) return false; //se o valor for true retorne false

            //se for false, aumente ou diminuia a linha e coluna por 1
            linha += passoLinha 
            coluna += passoColuna

        } 


        //Fazendo a Mesma coisa com For

        // for (
        // let i = 1,
        //     linha = origem.linha + passoLinha,
        //     coluna = origem.coluna + passoColuna;
        // i < Math.abs(destino.linha - origem.linha);
        // i++, linha += passoLinha, coluna += passoColuna
        // ) {
        //     if (tabuleiro[linha][coluna]) return false;
        // }

    }

    if(Math.abs(deltaLinha) !== Math.abs(deltaColuna)) return false //Se o resultado dos deltas nao forem iguais, significa que ele nao esta indo na diagonal, portanto return false

    if(!haPecaNoDestino) return true; //Se nao tem peça onde foi selecionado return true

    const pecaAlvo = haPecaNoDestino === haPecaNoDestino.toUpperCase(); //valor da const é boolean

    return ehBranco !== pecaAlvo
}