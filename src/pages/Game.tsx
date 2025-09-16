import { useLocation, useNavigate } from "react-router-dom";
import { ChessBoard } from "../components/ChessBoard";

import style from "./Game.module.css";

export function Game() {
    const navigate = useNavigate();
    const location = useLocation();

    const cor = location.state?.cor ?? 'branco' // fallback para caso a pessoa entre no site pela url e a informacao da cor escolhida n tiver sido passada

    let corDasPecas = '';

    if(cor === 'branco') {
        corDasPecas = 'Brancas'
    } else if (cor === 'preto') {
        corDasPecas = 'Pretas'
    }

    return(
        <div className={style.conteudo}>
            <h1>Você escolheu as peças: {corDasPecas}</h1>
            <ChessBoard corJogador={cor} />
            <button className={style.bRetornar} onClick={() => navigate('/')}>Retornar</button>
        </div>
    )
}