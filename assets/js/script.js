const verMais = document.querySelector(".navVerMaisFunciona");
const conteudo = document.querySelector(".secao2 .conteudoSecao");
const btn = verMais.querySelector(".btn");

verMais.addEventListener("click", () => {
    conteudo.classList.toggle("active");
    
    // Alterna apenas o texto do botão existente
    if (conteudo.classList.contains("active")) {
        btn.textContent = "Ocultar";
    } else {
        btn.textContent = "Ver Regras Completa";
    }
});

const cursor = document.getElementById("cursor")
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursor.style.left = `${mouseX - cursor.offsetWidth/2}px`
    cursor.style.top = `${mouseY - cursor.offsetHeight/2}px`
})

const parags = document.querySelectorAll(".secao3 .conteudoSecao3 nav p")
const updateActive = () => {
    const middleY = window.innerHeight/2;

    let closest = null
    let closestDist = Infinity

    parags.forEach(p=> {
        const rect = p.getBoundingClientRect();
        const dist = Math.abs((rect.top + rect.bottom)/2-middleY)
        if (dist < closestDist) {
            closestDist = dist;
            closest = p;
        }
    });
    parags.forEach(p=>p.classList.remove("activo"));
    if(closest) closest.classList.add("activo")
};

window.addEventListener("scroll", updateActive)
window.addEventListener("resize", updateActive)
window.addEventListener("load", updateActive)


const cards = document.querySelectorAll(".CardFundador");

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
  entry.target.classList.add("active");
}
});
}, {
threshold: 0.5
});

cards.forEach(card => observer.observe(card));




const input = document.getElementById('ficheiro');
const navCarregar = document.getElementById('navCarregarFicheiro');
const preview = document.getElementById('preview');

input.addEventListener('change', () => {
  preview.innerHTML = ''; // limpa preview anterior

  if (input.files.length > 0) {
    const file = input.files[0];

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = '250px';
      img.style.borderRadius = '10px';
      img.style.marginTop = '10px';
      img.style.border = '2px solid #40E194';
      preview.appendChild(img);
      preview.style.display = "block"
      navCarregar.style.display = "none";
      
  } else if (file.type === 'application/pdf') {
      preview.style.display = "block"
      const texto = document.createElement('p');
      texto.textContent = `📄 PDF carregado com sucesso: ${file.name}`;
      texto.style.color = '#40E194';
      texto.style.marginTop = '10px';
      preview.appendChild(texto);
      navCarregar.style.display = "none";
    } else {
      const erro = document.createElement('p');
      erro.textContent = 'Tipo de ficheiro não suportado.';
      erro.style.color = 'red';
      preview.appendChild(erro);
    }
  }
});


const mostraForm = document.getElementById("MostrarFomEnviar");
mostraForm.addEventListener("click", () => {
    var telaForm = document.getElementById("divEnviarPalpite");
    telaForm.classList.add("activo")
    document.querySelector("body").style.overflowY = "hidden"
    
})
const cancelarForm = document.getElementById("cancelarForm");
cancelarForm.addEventListener("click", () => {
    var telaForm = document.getElementById("divEnviarPalpite")
    telaForm.classList.remove("activo")
    document.querySelector("body").style.overflowY = "scroll"
})


const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer1.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.slide-left, .slide-right').forEach(el => {
  observer1.observe(el);
});


var menuHamburguer = document.querySelector(".menuHamburguer") 

menuHamburguer.addEventListener("click", () => {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("active");
})

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");
});

const cardsFounder = document.querySelectorAll('.CardFundador');

const observerFounder = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.8 // ativa quando 80% do card estiver visível
});

cardsFounder.forEach(card => observer.observe(card));

document.addEventListener("DOMContentLoaded", () => {
  const contadorParticipantes = document.getElementById("contadorParticipantes");
  const contadorVagas = document.getElementById("contadorVagas");

  // Obter hora e dia
  const agora = new Date();
  const horaAtual = agora.getHours();
  const diaSemana = agora.getDay(); // 0 = Domingo, 6 = Sábado

  // Função auxiliar para salvar e atualizar o localStorage
  const salvarDados = () => {
    localStorage.setItem("palpites777py", participantes);
    localStorage.setItem("vagas777py", vagas);
  };

  // Inicializar dados
  let participantes = parseInt(localStorage.getItem("palpites777py"));
  let vagas = parseInt(localStorage.getItem("vagas777py"));

  if (!participantes || !vagas) {
    participantes = Math.floor(Math.random() * (6000 - 4500 + 1)) + 4500;
    vagas = Math.floor(Math.random() * (201 - 101 + 1)) + 101;
    if (vagas % 2 === 0) vagas += 1;
    salvarDados();
  }

  // Atualizar UI
  const atualizarContadores = () => {
    contadorParticipantes.innerText = participantes.toLocaleString("pt-AO");
    contadorVagas.innerText = vagas.toLocaleString("pt-AO");
  };

  atualizarContadores();

  // Lógica de aceleração
  let ciclos = 0;

  setInterval(() => {
    ciclos++;

    // Atualiza hora e dia
    const agora = new Date();
    const horaAtual = agora.getHours();
    const diaSemana = agora.getDay();

    // Aumento base
    let aumento = Math.floor(Math.random() * 3); // +0 a +2

    // A cada 10 minutos (ciclo de 40 x 15s)
    if (ciclos % 40 === 0) {
      aumento += Math.floor(Math.random() * 5) + 1; // +1 a +5
    }

    // Terça (2), Sábado (6) ou Domingo (0) → aumento extra
    if ([0, 2, 6].includes(diaSemana)) {
      aumento += Math.floor(Math.random() * 4); // +0 a +3
    }

    // Se ainda não for 21h, reduzir vagas normalmente
    if (horaAtual < 21) {
      if (vagas > 1) {
        vagas -= Math.floor(Math.random() * 2); // -0 ou -1
        if (vagas < 1) vagas = 1;
      }
    } else {
      // Após 21h → força o fim das vagas
      vagas = 0;
    }

    participantes += aumento;
    salvarDados();
    atualizarContadores();
  }, 15000); // a cada 15 segundos
});