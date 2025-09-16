import { useState } from "react"
import { useNavigate } from "react-router-dom";

import style from "./Iniciar.module.css"

export function Iniciar() {

    const [escolha, setEscolha] = useState<string | null>(null); 
    
    //o use state funciona da seguinte forma é uma const que guarda uma informação e uma função, essa função faz com que seja possivel mudar essa informação ou acrescentar mais de uma informacao se for criado como um array. Logo apos voce diz que aquela variavel é um usestate, pode tipalo e entre parenteses coloca seu valor inicial

    const navigate = useNavigate();

    function selecionarBranco() {
        setEscolha('branco')
    }

    function selecionarPreto() {
        setEscolha('preto')
    }

    return (
        <div className={style.containerPrincipal}>

            <h1>Bem vindo ao Xadrez Master</h1>

            <div className={style.container__Escolhas}>

                <span>Antes de começar escolha a cor da sua peça:</span>

                <div className={style.escolhas__Botoes}>

                    <button className={style.bBranco} onClick={selecionarBranco} style={{border: escolha === 'branco' ? '4px solid yellow' : '4px solid black'}}>Branco</button> 

                    <button className={style.bPreto} onClick={selecionarPreto} style={{border: escolha === 'preto' ? '4px solid yellow' : '4px solid black'}}>Preto</button>

                </div>

            </div>
 
            <button className={style.bIniciar} onClick={() => navigate('/chess', {state: {cor: escolha}})} disabled={!escolha}>Inciar Jogo</button>

        </div>
    )
}