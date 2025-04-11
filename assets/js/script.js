var bool = 0;
var verMais = document.querySelector(".navVerMaisFunciona")
verMais.addEventListener("click", ()=> {
    var conteudo = document.querySelector(".secao2 .conteudoSecao")
    conteudo.classList.toggle("active")
    
    verMais.innerHTML = "<button class='btn'>Ocultar</button>"
})

var verFundadores = document.querySelector(".todosFundadores");
verFundadores.addEventListener("click", () => {
    var conteudo = document.querySelector(".secao4 .conteudoSecao4")
    conteudo.classList.toggle("ativo")
    verFundadores.innerHTML = "<button class='btn'>Ocultar</button>"
})

var verQuestoes = document.querySelector(".VerTodasQuestoes")
verQuestoes.addEventListener("click", () => {
    var conteudo = document.querySelector(".secao5 .conteudoPerguntas")
    conteudo.classList.toggle("active")
    verQuestoes.innerHTML = "<button class='btn'>Ver Menos Questões</button>"
})


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