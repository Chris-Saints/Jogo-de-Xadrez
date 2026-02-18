import { useLocation, useNavigate } from "react-router-dom";


import style from "./Game.module.css";
import { ChessBoard } from "../../components/ChessBoard/ChessBoard";

export function Game() {
    const navigate = useNavigate();
    const location = useLocation();

    const cor = location.state?.cor ?? 'branco' // fallback para caso a pessoa entre no site pela url e a informacao da cor escolhida n tiver sido passada


    return(
        <div className={style.conteudo}>
            <ChessBoard corJogador={cor} />
            <button className={style.bRetornar} onClick={() => navigate('/')}>Retornar</button>
        </div>
    )
}