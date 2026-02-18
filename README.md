<h1 align="center">Chess Master</h1>

<div align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/stats-Em_andamento-orange?style=flat-square">
  <img alt="Static Badge" src="https://img.shields.io/badge/style-css_modules-blue?style=flat-square">
</div>
  
<br>

<div>
  <img width="1870" height="473" alt="Captura de tela 2026-02-18 110201" src="https://github.com/user-attachments/assets/b437ddc5-0af6-450b-aaf3-af34471e90e8" />
</div>


<br>

<p>O Chess Master é um tabuleiro de xadrez online, onde se pode jogar uma partida junto de outra pessoa localmente. Esse é um projeto próprio onde toda a construção dele foi com foco no estudo e prática. Tive bastante ajuda de videos e de IA, para entender a lógica do funcionamento de um tabuleiro e transformar todas essas ações e consequências em códigos. É o primeiro projeto pessoal usando o React (quando ainda não sabia muito como funcionava).</p>

<p>OBS: Por ser um projeto de início dos meus estudos, o código, todo ao meu ver, está muito bagunçado e muito extenso. Por isso ainda está em andamento. Futuramente irei dar uma enxugada.</p>

# Funcionalidades do projeto

- `Escolher a cor da Peça`: A página inicial do Chess Master te da a opção de escolher a cor das suas peças. Mecânicamente, pelo projeto ser para partidas locais, nada muda. A única mudança é a disposição das peças. A cor que for escolhida, ficará sempre em baixo.
  ![Imagens sobre postar um comentário](https://github.com/user-attachments/assets/fdb3cae8-3606-4749-af8f-ac3612f5f184)

- `Regras do Xadrez`: O Chess Master segue todas as regras do xadrez. As brancas sendo as primeiras a serem movidas, A possibilidade de fazer o movimento "roque", porem apenas se o rei ou as respectivas torres não tendo se mexido ainda, os xeques e xeque-mate...
   ![Imagens sobre postar um comentário](https://github.com/user-attachments/assets/81c2c7ef-d722-4bbd-882f-8562d06a7e74)

- `Mover uma peça`: Ao clicar em uma peça você poderá clicar em outra casa, se for possível que a peça clicada vá para a casa clicada, ela irá. Se não o movimento não será feito.        *Atualizações futuras para contornar casas que são possíveis para movimentação*
   ![Imagens sobre postar um comentário](https://github.com/user-attachments/assets/5587c9b0-2f16-4c69-a0b8-5764976b4a08)

- `Comer uma peça adversaria`: Caso na casa selecionada houver uma peça adversária e o movimento for possível, ela será tirada do jogo. Se a peça alvo for da mesma cor, o movimento não será possível.
   ![Imagens sobre postar um comentário](https://github.com/user-attachments/assets/ec748ce4-1b20-44ba-9e17-38fbe4cacbf5)

- `Ganhar a partida`: Ao verificar o xeque-mate, aparecerá uma mensagem na tela mostrando o vencer. Quando houver apenas xeque, a casa onde o rei estiver ficará vermelha e apenas movimentos possíveis para tirar-lo do xeque serão aceitos.   *Atualização em caso de empates*
 ![Imagens sobre postar um comentário](https://github.com/user-attachments/assets/19ada9de-4fb0-4dd0-a7b2-384dde8e1e7d)





# Técnicas e tecnologias usadas
- `typescript`
- `Css Modules`
- `React + Vite`

# Autor
[<img loading="lazy" src="https://avatars.githubusercontent.com/u/200855458?v=4" width=115><br><sub>Christian Picoli</sub>](https://github.com/Chris-Saints)
