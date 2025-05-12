const startupsTxt = `
    Gympass;Corpo e mente andam juntos;2025
    Arena Digital;Conectando torcedores em tempo real;2023
    Digitla 4 Sports;Tecnologia a favor do desempenho esportivo;2022
    Escola Gestão Fitness;Formando líderes do esporte;2024
    Federal Esportes;Movimentando o Brasil com esportes;2023
    Footure GC;Gestão e consultoria esportiva moderna;2021
    Futbox;Arquivando a história do futebol;2020
    Futebol Interativo;Aprendizado dentro das quatro linhas;2022
    Futsalonair;A voz oficial do futsal na internet;2023
    Incentivando Esportes;Mais incentivo, mais atletas;2025
    Live Mode;O jogo ao vivo onde você estiver;2024
    Quero Pedalar;Conectando ciclistas ao redor do Brasil;2023
    Soul Brasil;O esporte brasileiro em essência;2025
    Sport Commit;Compromisso com o esporte;2024
    Sports Network;A rede de atletas e treinadores;2021
    The 360;Visão completa do esporte;2022
    Torcedores.com;Notícias feitas por quem torce;2020
    UniSport;Integrando esportes nas universidades;2023
    Universitario+;A evolução do esporte universitário;2025
    GameFit;Gamificando o treino diário;2024
    Placar Instantâneo;Resultados em tempo real para apaixonados;2022
    CoachTrack;Rastreamento inteligente de treinos;2023
    PlayPro;Sua carreira esportiva começa aqui;2025
    ArenaVR;Experiências esportivas em realidade virtual;2024
    Bola na Rede;A rede social dos boleiros;2023
    BikeOn;Pedalando para o futuro urbano;2025
    RunUp;Desafios de corrida com recompensas reais;2022
    FanArena;Engajamento de fãs via streaming;2023
    Esporte360;Cobertura total em todos os ângulos;2021
    MoveNow;Aplicativo de treinos em qualquer lugar;2024
    Tribo Esportiva;Criando comunidades de atletas;2023
    Torcida Inteligente;Dados e emoção lado a lado;2025
    PulseFit;A batida do seu treino ideal;2022
    AtletaUp;Do amador ao profissional, todos crescem;2023
    FitMatch;Encontrando o parceiro de treino ideal;2024
    SwimTech;Tecnologia para nadadores de elite;2023
    GingaTech;Inovação com alma brasileira;2025
    Arena Connect;Unindo fãs, clubes e marcas;2022
    FitMind;Corpo são, mente conectada;2024
    PlaybookPro;Estratégia esportiva com inteligência;2023
`

class StartUp {
    constructor(nome, slogan, ano) {
      this.nome = nome;
      this.slogan = slogan;
      this.ano = ano;
      this.pontos = 70;
      this.pitches = 0;
      this.bugs = 0;
      this.tracoes = 0;
      this.investidores = 0;
      this.fakeNews = 0;
      this.vivo = true;
    }
  }
  
class Batalha {
  constructor(s1, s2, num) {
    this.s1 = s1;
    this.s2 = s2;
    this.num = num;
    this.ganhador = false;
  }
}
  
function leArquivo() {
    const allStartups = [];
    const lines = startupsTxt.trim().split("\n");
    return lines.map(line => {
        const [nome, slogan, ano] = line.split(";");
        return new StartUp(nome.trim(), slogan.trim(), parseInt(ano));
    }); 
}

function recuperarBatalhas() {
  const data = JSON.parse(localStorage.getItem("batalhasRodadaAtual")) || [];
  return data.map(b => {
 
    const s1 = new StartUp(b.s1.nome, b.s1.slogan, b.s1.ano);
    Object.assign(s1, b.s1);

    const s2 = new StartUp(b.s2.nome, b.s2.slogan, b.s2.ano);
    Object.assign(s2, b.s2);

    const batalha = new Batalha(s1, s2, b.num);
    Object.assign(batalha, b);

    return batalha;
  })
}

function recuperarStartupsVivas() {
  const data = JSON.parse(localStorage.getItem("startupsVivas")) || []; //pode ser acionado mesmo sem nenhum item "[]"
  return data.map(s => {
    const startup = new StartUp(s.nome, s.slogan, s.ano);
    Object.assign(startup, s); // copia pontos, eventos aplicados etc.
    return startup;
  });
}

function recuperarStartups(){
  const data = JSON.parse(localStorage.getItem("startups")) || []; //pode ser acionado mesmo sem nenhum item "[]"
  return data.map(s => {
    const startup = new StartUp(s.nome, s.slogan, s.ano);
    Object.assign(startup, s); // copia pontos, eventos aplicados etc.
    return startup;
  });
}

function removeStartups(){
  localStorage.removeItem("startups");
  localStorage.removeItem("startupsVivas");
}

function generateStartUp(){
  const s = recuperarStartups();
  const allStartups = leArquivo();
  if (s.length < 8) { 
    const i = Math.floor(Math.random() * allStartups.length); //pega um número aleatório de 0 a 40-1 (tamanho de indices no allStartups)
    const escolhida = allStartups.splice(i, 1)[0]; //remove e pega a startup
    s.push(escolhida);
    localStorage.setItem("startups", JSON.stringify(s));
    atualizaStartups();
    add();
  }
  if(s.length === 4 || s.length === 8){
    remove();
  }
}
 
  function cadastrarStartUp(nome, slogan, ano) {
    const s = recuperarStartups();
    if (s.length < 8) { 
      const nova = new StartUp(nome, slogan, ano);
      s.push(nova);
      localStorage.setItem("startups", JSON.stringify(s));
      atualizaStartups();
      add();
    }
    if(s.length === 4 || s.length === 8){
      remove();
    }
  }

  function atualizaStartups(){ 
    const startupsSalvas = recuperarStartups(); //pega todas as startups
    startupsSalvas.sort((a, b) => b.pontos - a.pontos); //faz qsort para organizar lista em ordem descrescente
    const lista = document.getElementById("ul_startupList");
    lista.innerHTML = startupsSalvas.map((s, i) => `<li class="li_startup"><h2 style="color: greenyellow;">${i + 1}. ${s.nome}</h2><p style="color: white; font-style: italic;">"${s.slogan}"</p><p style="color: rgb(60, 241, 157);">${s.ano}</p><p style="text-align: right; color: rgba(51, 240, 82, 0.815);">[ ${s.pontos} Pontos]</p></li>`).join("");
  }
  
  function add(){
    test = document.getElementById("test");
    test.classList.add("a_noLink");
  }

  function remove(){
    test = document.getElementById("test");
    test.classList.remove("a_noLink");
    test.setAttribute("href", "./battle.html");
    //test.setAttribute("onclick", "iniciarTorneio()");
  }

function carregaBatalha(){ //inicia torneio ao entra no battle.html
  atualizaStartups();   //imprime startups
  atualizaChave();      //imprime a chave do torneio
  atualizaBatalhas();   //imprime as batalhas na chave
}

function iniciarTorneio(){
  const startupsSalvas = recuperarStartups(); //pega todas as startups
  localStorage.setItem("startupsVivas", JSON.stringify(startupsSalvas)); //ao inicio do torneio as startups vivas são todas as cadastradas
  gerarBatalhas();      //faz o pareamento aleatorio das batalhas 
}


function gerarBatalhas(){
    const startupsSalvas = recuperarStartupsVivas();

    for(let i=0; i<startupsSalvas.length; i++){
      console.log(startupsSalvas.length);
        const r = Math.floor(Math.random() * startupsSalvas.length);
        [startupsSalvas[i], startupsSalvas[r]] = [startupsSalvas[r], startupsSalvas[i]];
    }
    const batalhasTemp = [];
    let num = 1;
    for (let i=0; i<startupsSalvas.length; i+=2) {
        const s1 = startupsSalvas[i];
        const s2 = startupsSalvas[i + 1];
        batalhasTemp.push(new Batalha(s1, s2, num++));
    }
    localStorage.setItem("batalhasRodadaAtual", JSON.stringify(batalhasTemp));
}

function batalhaIndividual(num){
  const lista = document.getElementById("div_individualBattle");
  const batalhasSalvas = recuperarBatalhas();//JSON.parse(localStorage.getItem("batalhasRodadaAtual"));

  for(let i=0; i<batalhasSalvas.length; i++){
    if(batalhasSalvas[i].num === num){
      lista.innerHTML = `<li><button id="btn1" onclick="chooseStartup(${num}, 1)" class="button_default"><h2>${batalhasSalvas[num-1].s1.nome} (${batalhasSalvas[num-1].s1.pontos})</h2></button></li><img class="img_buttonImage img_notRounded" src="../../media/battle-logo.png" alt="Battle Logo"><li id="s2"><button id="btn2" onclick="chooseStartup(${num}, 2)" class="button_default"><h2>${batalhasSalvas[num-1].s2.nome} (${batalhasSalvas[num-1].s2.pontos})</h2></button></li>`;
    }
  }
   
}

function atualizaChave(){ //chave padrão sem nada
  const coluna1 = document.getElementById("div_columnOne");
  const coluna2 = document.getElementById("div_columnTwo");
  const coluna3 = document.getElementById("div_columnThree");

  const batalha = '<ul class="ul_tournamentKey"><button class="button_default"><li class="li_top li_nothing"></li><li class="li_bottom li_nothing"></li></button></ul>';
  for(let i=0; i<4; i++){
    if(i<1){
      coluna3.innerHTML += batalha;
    }
    if(i<2){
      coluna2.innerHTML += batalha;
    }
    coluna1.innerHTML += batalha;
  }
}

function atualizaBatalhas(){
    const batalhasSalvas = recuperarBatalhas();//JSON.parse(localStorage.getItem("batalhasRodadaAtual"));
    console.log(batalhasSalvas.length);
    const coluna = batalhasSalvas.length;

    if(batalhasSalvas.length === 4){
        const lista = document.getElementById("div_columnOne");
        lista.innerHTML = batalhasSalvas.map((b) => `<ul class="ul_tournamentKey"><button id="button_${b.num}" class="button_default cursorPointer" onclick="openWindown(${b.num})"><li id="startup_${b.s1.nome}${coluna}" class="li_top"><p>${b.num}</p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s1.nome} (${b.s1.pontos})</p></li><li id="startup_${b.s2.nome}${coluna}" class="li_bottom"><p></p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s2.nome} (${b.s2.pontos})</p></li></button></ul>`).join("");
    } else if(batalhasSalvas.length === 2){
        const lista = document.getElementById("div_columnTwo");
        lista.innerHTML = batalhasSalvas.map((b) => `<ul class="ul_tournamentKey"><button id="button_${b.num}" class="button_default cursorPointer" onclick="openWindown(${b.num})"><li id="startup_${b.s1.nome}${coluna}" class="li_top"><p>${b.num}</p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s1.nome} (${b.s1.pontos})</p></li><li id="startup_${b.s2.nome}${coluna}" class="li_bottom"><p></p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s2.nome} (${b.s2.pontos})</p></li></button></ul>`).join("");
    } else if(batalhasSalvas.length === 1){
        const lista = document.getElementById("div_columnThree");
        lista.innerHTML = batalhasSalvas.map((b) => `<ul class="ul_tournamentKey"><button id="button_${b.num}" class="button_default cursorPointer" onclick="openWindown(${b.num})"><li id="startup_${b.s1.nome}${coluna}" class="li_top"><p>${b.num}</p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s1.nome} (${b.s1.pontos})</p></li><li id="startup_${b.s2.nome}${coluna}" class="li_bottom"><p></p><p style="padding-left: 10px; color: rgba(0, 0, 0, 0.753);">${b.s2.nome} (${b.s2.pontos})</p></li></button></ul>`).join("");
    }

    let cont=0;
    const vivas = [];
    for(let i=0; i<batalhasSalvas.length; i++){ //verifica se há vencedores nas batalhas
      let b = batalhasSalvas[i];
      if(b.ganhador){
        cont++;
        if(b.s1.vivo){
          vivas.push(b.s1);
          decideVencedor(b.s1, coluna);
        } else {
          decideVencedor(b.s2, coluna);
          console.log(b.s2.nome);
          vivas.push(b.s2);
          
        }
        removeBatalha(b.num);
        console.log(b.num);
      }
    }
    localStorage.setItem("startupsVivas", JSON.stringify(vivas));

   
    if(cont === batalhasSalvas.length){
     if(cont === 1){
      window.location.href = "./resultado.html"; //vai para resultado
      return;
     } else {
      gerarBatalhas();
      atualizaBatalhas();
     }
    }
}

function chooseStartup(num, startupInd){ //Escolhe a startup da batalha
  const btn1 = document.getElementById("btn1")
  const btn2 = document.getElementById("btn2")

  const eventos = document.getElementsByClassName("event"); //Ao clicar numa Startup ativa-se a função de aplicar evento e tira o checked dos eventos
  for(let i=0; i<eventos.length; i++){
    eventos[i].setAttribute("onclick", `eventSum(${num},${startupInd})`);
    eventos[i].checked = false;
  }

  if (startupInd === 1) {
   btn1.classList.add("chosen");
  } else {
    btn2.classList.add("chosen");
  } 
}

function sharkFight(b) {
  const r = Math.floor(Math.random() * 2); //número aleatório entre 0 e 1
  if (r === 0) {
    b.s1.pontos += 32;
    b.s2.vivo = false;
  } else {
    b.s2.pontos += 32;
    b.s1.vivo = false;
  }
  return b;
}

function aplicarEvento(s, evento) {
  switch (evento) {
    case "pitch": s.pontos += 6; s.pitches++; break;
    case "bug": s.pontos -= 4; s.bugs++; break;
    case "tracao": s.pontos += 3; s.tracoes++; break;
    case "investidor": s.pontos -= 6; s.investidores++; break;
    case "fakenews": s.pontos -= 8; s.fakeNews++; break;
  }
  return s;
}

function eventSum(num, startupInd){
  const batalhasSalvas = recuperarBatalhas();

  const eventos = document.getElementsByClassName("event");
  const eventosSelecionados = [];
  for(let i=0; i<eventos.length; i++){
    if(eventos[i].checked){
      eventosSelecionados.push(eventos[i].value);
    }
  }

  for(let i=0; i<batalhasSalvas.length; i++){
    if(batalhasSalvas[i].num === num){
      let s;
    if(startupInd === 1){
      s = batalhasSalvas[i].s1;
    } else if(startupInd === 2) {
      s = batalhasSalvas[i].s2;
    } else {
      break;
    }

    if(!s.eventosAplicados){
      s.eventosAplicados = [];
    }
  
    for(let j=0; j<eventosSelecionados.length; j++){
      const evento = eventosSelecionados[j];
      if(!s.eventosAplicados.includes(evento)){
        s.eventosAplicados.push(evento);
        s = aplicarEvento(s, evento);
      }
    }

    if(startupInd === 1){
      batalhasSalvas[i].s1 = s;
    } else if(startupInd === 2) {
      batalhasSalvas[i].s2 = s;
    }
    break;
    }
  }
    //localStorage.setItem("batalhasTemporarias", JSON.stringify(batalhasSalvas));
    localStorage.setItem("batalhasRodadaAtual", JSON.stringify(batalhasSalvas));
    batalhaIndividual(num);
}

function decideVencedor(s, coluna){
  const startup = document.getElementById(`startup_${s.nome}${coluna}`);
  startup.classList.add("winner");
} 

function removeBatalha(num){
  const button = document.getElementById(`button_${num}`);
  button.classList.remove("cursorPointer");
  button.removeAttribute("onclick", openWindown);
} 

function compararBatalhas(num){
  const batalhasSalvas = recuperarBatalhas();
  const coluna = batalhasSalvas.length;
 
  for(let i=0; i<batalhasSalvas.length; i++){
    let b = batalhasSalvas[i];
    const s1 = b.s1;
    const s2 = b.s2;
    s1.eventosAplicados = [];
    s2.eventosAplicados = [];
    if(b.num === num && !b.ganhador){ //se condiz com o número da batalha passado. não é necessário verificar se há ganhador, pois não há como voltar para a batalha assim que confirmada
      
      if(s1.pontos > s2.pontos){
        s1.pontos += 30;
        s2.vivo = false;
        salvaStartups(s1);
        decideVencedor(s1, coluna);
      } else if(s1.pontos < s2.pontos) {
        s1.vivo = false;
        s2.pontos += 30;
        salvaStartups(s2);
        decideVencedor(s2, coluna);
      } else {
        b = sharkFight(b); //usar let para funcionar
        if(b.s1.vivo){
          salvaStartups(s1);
          decideVencedor(s1, coluna);
        } else {
          salvaStartups(s2);
          decideVencedor(s2, coluna);
        }
      }
      removeBatalha(num);
      b.s1 = s1;
      b.s2 = s2;
      b.ganhador = true;
      batalhasSalvas[i] = b;
    }
  }

  localStorage.setItem("batalhasRodadaAtual", JSON.stringify(batalhasSalvas));
  atualizaBatalhas();   //imprime batalhas
}
 
function salvaStartups(s){ //já organiza em qsort
  const todasStartups = recuperarStartups();

  for(let i=0; i<todasStartups.length; i++){
    if(s.nome === todasStartups[i].nome){
      todasStartups[i] = s;
    }
  }
  localStorage.setItem("startups", JSON.stringify(todasStartups));
  atualizaStartups();
}

function openWindown(num){ //Função para abrir janela da batalha individual
  const windown = document.getElementById("div_windown");
  windown.classList.add("open");
  const closeWindown = document.getElementById("closeWindown");
  closeWindown.setAttribute("onclick", `closeWindown(${num})`); //Passa o número da batalha para o botão de fechamento da janela
  batalhaIndividual(num);
}

function closeWindown(num){
  const windown = document.getElementById("div_windown");
  windown.classList.remove("open");
  const eventos = document.getElementsByClassName("event"); 
  for(let i=0; i<eventos.length; i++){ //Desabilita o checked dos botões ao fechar a janela 
    eventos[i].checked = false;
  }
  compararBatalhas(num);
}

function imprimirListaFinal(){
  startupsSalvas = recuperarStartups();
  const tabela = document.getElementById("tabelaStartups");
  startupsSalvas.sort((a, b) => b.pontos - a.pontos); //ordena em ordem decrescente
  for(let i=0; i<startupsSalvas.length; i++){
    s = startupsSalvas[i]; 
    if(i ===0){
      tabela.innerHTML += `<td class="vencedora">${s.nome}</td><td>${s.pontos}</td><td>${s.pitches}</td><td>${s.bugs}</td><td>${s.tracoes}</td><td>${s.investidores}</td><td>${s.fakeNews}</td><td class="vencedora" style="font-style:italic">"${s.slogan}"</td>`;
    } else {
      tabela.innerHTML += `<td>${s.nome}</td><td>${s.pontos}</td><td>${s.pitches}</td><td>${s.bugs}</td><td>${s.tracoes}</td><td>${s.investidores}</td><td>${s.fakeNews}</td><td>-</td>`;
    }
  }
}

