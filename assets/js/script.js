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