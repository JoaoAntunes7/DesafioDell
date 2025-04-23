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

const startups = [];

document.getElementById('form_cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const slogan = document.getElementById('slogan').value.trim();
    const ano = parseInt(document.getElementById('ano').value);

    const startup = {
        nome,
        slogan,
        ano,
        pontos: 70,
        pitches: 0,
        bugs: 0,
        tracoes: 0,
        investidores: 0,
        fakeNews: 0,
        vivo: true
      };
      
    startups.push(startup); 
    
    atualizaLista();
    this.reset();
});

function atualizarLista() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";
  
    startups.forEach((startup, index) => {
      const item = document.createElement('li');
      item.className = 'startup';
      item.innerHTML = `<strong>${index + 1}. ${startup.nome}</strong> (${startup.ano})<br>
                        Slogan: "${startup.slogan}"<br>
                        Pontos: ${startup.pontos}`;
      lista.appendChild(item);
    });
}