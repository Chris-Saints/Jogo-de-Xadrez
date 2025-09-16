import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Iniciar } from "./pages/Iniciar";
import { Game } from "./pages/Game";

import style  from "./App.module.css"

import './global.css';

export function App() {
  return (
    <div className={style.posicionamentoInicial}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Iniciar />} />
          <Route path="/chess" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
