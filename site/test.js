// Startup Rush em JavaScript

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
    constructor(s1, s2) {
      this.s1 = s1;
      this.s2 = s2;
      this.ganhador = false;
    }
  }
  
  function evento(startup, tipo) {
    switch (tipo) {
      case 1: startup.pontos += 6; startup.pitches++; break;
      case 2: startup.pontos -= 4; startup.bugs++; break;
      case 3: startup.pontos += 3; startup.tracoes++; break;
      case 4: startup.pontos -= 6; startup.investidores++; break;
      case 5: startup.pontos -= 8; startup.fakeNews++; break;
    }
  }
  
  function sharkFight(batalha) {
    const r = Math.floor(Math.random() * 2);
    if (r === 0) {
      batalha.s1.pontos += 32;
      batalha.s2.vivo = false;
    } else {
      batalha.s2.pontos += 32;
      batalha.s1.vivo = false;
    }
  }
  
  function administrarBatalha(batalha, logs) {
    let decisao = false;
    while (!decisao) {
      // Simulação ou integração com interface vai aqui
      // Exemplo de simulação:
      const num = Math.floor(Math.random() * 2) + 1;
      const event = Math.floor(Math.random() * 5) + 1;
      evento(num === 1 ? batalha.s1 : batalha.s2, event);
  
      if (Math.random() < 0.3) {
        if (batalha.s1.pontos > batalha.s2.pontos) {
          batalha.s1.pontos += 30;
          batalha.s2.vivo = false;
        } else if (batalha.s1.pontos < batalha.s2.pontos) {
          batalha.s2.pontos += 30;
          batalha.s1.vivo = false;
        } else {
          sharkFight(batalha);
        }
        batalha.ganhador = true;
        decisao = true;
      }
    }
    logs.push(`Batalha: ${batalha.s1.nome} vs ${batalha.s2.nome}`);
  }
  
  function gerarBatalhas(startups, round, logs) {
    startups.sort(() => Math.random() - 0.5);
    const batalhas = [];
    for (let i = 0; i < startups.length; i += 2) {
      batalhas.push(new Batalha(startups[i], startups[i + 1]));
    }
  
    for (let i = 0; i < batalhas.length; i++) {
      administrarBatalha(batalhas[i], logs);
    }
  
    return batalhas;
  }
  
  function compare(a, b) {
    return b.pontos - a.pontos;
  }
  
  function startTorneio(startups) {
    let vivos = startups.slice();
    const eliminados = [];
    let round = 1;
    const logs = [];
  
    while (vivos.length > 1) {
      logs.push(`===== ROUND ${round} =====`);
      const batalhas = gerarBatalhas(vivos, round, logs);
      const novosVivos = [];
      vivos.forEach((s, idx) => {
        if (s.vivo) novosVivos.push(s);
        else eliminados.push(s);
      });
      vivos = novosVivos;
      round++;
    }
  
    eliminados.push(vivos[0]);
    eliminados.sort(compare);
  
    return {
      vencedor: eliminados[0],
      ranking: eliminados,
      log: logs
    };
  }
  
  // Exemplo de uso:
  const startups = [
    new StartUp("TechNova", "Inovação que move", 2018),
    new StartUp("BioHeal", "Saúde biointeligente", 2020),
    new StartUp("AgroX", "Revolução no campo", 2019),
    new StartUp("EduNext", "O futuro da educação", 2021)
  ];
  
  const resultado = startTorneio(startups);
  console.log(`Vencedor: ${resultado.vencedor.nome}`);
  console.log("Ranking final:");
  resultado.ranking.forEach((s, i) => {
    console.log(`${i + 1}. ${s.nome} - ${s.pontos} pontos`);
  });
  
  // Para integrar com HTML, você pode expor essas funções e interagir via DOM ou inputs.
  