// Espera o DOM estar pronto
document.addEventListener("DOMContentLoaded", () => {
  // --- CARROSSEL DE PERGUNTAS ---
  const carousel = document.querySelector(".conteudoPerguntas");
  const cards = document.querySelectorAll(".navPergunta");
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");

  if (cards.length > 0) {
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = parseInt(cardStyle.width) + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);

    let currentPosition = 0;
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    const maxPosition = cards.length - visibleCards;

    const updateButtons = () => {
      prevBtn.style.display = currentPosition <= 0 ? "none" : "flex";
      nextBtn.style.display = currentPosition >= maxPosition ? "none" : "flex";
    };

    const moveCarousel = () => {
      carousel.scrollTo({ left: currentPosition * cardWidth, behavior: "smooth" });
      updateButtons();
    };

    prevBtn.addEventListener("click", () => currentPosition > 0 && (currentPosition--, moveCarousel()));
    nextBtn.addEventListener("click", () => currentPosition < maxPosition && (currentPosition++, moveCarousel()));

    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" && currentPosition > 0) currentPosition--;
      else if (e.key === "ArrowRight" && currentPosition < maxPosition) currentPosition++;
      moveCarousel();
    });

    let touchStartX = 0;
    carousel.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    carousel.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta < 0 && currentPosition < maxPosition) currentPosition++;
        else if (delta > 0 && currentPosition > 0) currentPosition--;
        moveCarousel();
      }
    }, { passive: true });

    updateButtons();
  }

  // --- VER MAIS / OCULTAR ---
  const verMais = document.querySelector(".navVerMaisFunciona");
  if (verMais) {
    const conteudo = document.querySelector(".secao2 .conteudoSecao");
    const btn = verMais.querySelector(".btn");

    verMais.addEventListener("click", () => {
      conteudo.classList.toggle("active");
      btn.textContent = conteudo.classList.contains("active") ? "Ocultar" : "Ver Regras Completa";
    });
  }

  // --- CURSOR CUSTOMIZADO ---
  const cursor = document.getElementById("cursor");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
    });
  }

  // --- ATIVAR P PARÁGRAFO VISÍVEL ---
  const parags = document.querySelectorAll(".secao3 .conteudoSecao3 nav p");
  const updateActive = () => {
    const middleY = window.innerHeight / 2;
    let closest = null, closestDist = Infinity;
    parags.forEach(p => {
      const dist = Math.abs((p.getBoundingClientRect().top + p.getBoundingClientRect().bottom) / 2 - middleY);
      if (dist < closestDist) [closestDist, closest] = [dist, p];
    });
    parags.forEach(p => p.classList.remove("activo"));
    if (closest) closest.classList.add("activo");
  };
  window.addEventListener("scroll", updateActive);
  window.addEventListener("resize", updateActive);
  updateActive();

  // --- ANIMAÇÃO AO ENTRAR NA TELA ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".CardFundador").forEach(card => observer.observe(card));

  // --- PREVIEW DE FICHEIRO ---
  const input = document.getElementById("ficheiro");
  const navCarregar = document.getElementById("navCarregarFicheiro");
  const preview = document.getElementById("preview");
  if (input && preview && navCarregar) {
    input.addEventListener("change", () => {
      preview.innerHTML = "";
      const file = input.files[0];
      if (!file) return;
      preview.style.display = "block";
      navCarregar.style.display = "none";
      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        Object.assign(img.style, { maxWidth: "250px", borderRadius: "10px", marginTop: "10px", border: "2px solid #40E194" });
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
      } else if (file.type === "application/pdf") {
        const p = document.createElement("p");
        p.textContent = `📄 PDF carregado com sucesso: ${file.name}`;
        p.style.color = "#40E194";
        p.style.marginTop = "10px";
        preview.appendChild(p);
      } else {
        const erro = document.createElement("p");
        erro.textContent = "Tipo de ficheiro não suportado.";
        erro.style.color = "red";
        preview.appendChild(erro);
      }
    });
  }

  // --- FORMULÁRIO DE ENVIO ---
  const mostraForm = document.getElementById("MostrarFomEnviar");
  const cancelarForm = document.getElementById("cancelarForm");
  const telaForm = document.getElementById("divEnviarPalpite");
  if (mostraForm && cancelarForm && telaForm) {
    mostraForm.addEventListener("click", () => {
      telaForm.classList.add("activo");
      document.body.style.overflowY = "hidden";
    });
    cancelarForm.addEventListener("click", () => {
      telaForm.classList.remove("activo");
      document.body.style.overflowY = "scroll";
    });
  }

  // --- ANIMAÇÕES SLIDE ---
  const observerSlide = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observerSlide.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll(".slide-left, .slide-right").forEach(el => observerSlide.observe(el));

  // --- MENU HAMBURGUER ---
  const menuHamburguer = document.querySelector(".menuHamburguer");
  if (menuHamburguer) {
    menuHamburguer.addEventListener("click", () => {
      document.querySelector(".menu").classList.toggle("active");
    });
  }

  // --- PRELOADER ---
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("hide");

  // --- CONTADOR PARTICIPANTES/VAGAS ---
  const contadorParticipantes = document.getElementById("contadorParticipantes");
  const contadorVagas = document.getElementById("contadorVagas");

  let participantes = parseInt(localStorage.getItem("palpites777py"));
  let vagas = parseInt(localStorage.getItem("vagas777py"));

  const salvarDados = () => {
    localStorage.setItem("palpites777py", participantes);
    localStorage.setItem("vagas777py", vagas);
  };

  if (!participantes || !vagas) {
    participantes = Math.floor(Math.random() * 1501) + 4500;
    vagas = Math.floor(Math.random() * 101) + 101;
    if (vagas % 2 === 0) vagas += 1;
    salvarDados();
  }

  const atualizarContadores = () => {
    contadorParticipantes.innerText = participantes.toLocaleString("pt-AO");
    contadorVagas.innerText = vagas.toLocaleString("pt-AO");
  };

  atualizarContadores();

  let ciclos = 0;
  setInterval(() => {
    ciclos++;
    let aumento = Math.floor(Math.random() * 3);
    if (ciclos % 40 === 0) aumento += Math.floor(Math.random() * 5) + 1;
    if ([0, 2, 6].includes(new Date().getDay())) aumento += Math.floor(Math.random() * 4);
    if (new Date().getHours() < 21) vagas = Math.max(1, vagas - Math.floor(Math.random() * 2));
    else vagas = 0;
    participantes += aumento;
    salvarDados();
    atualizarContadores();
  }, 15000);

  // --- FECHAR MENU MOBILE AO CLICAR ---
  document.querySelectorAll(".linksMenu").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.querySelector(".menu").classList.remove("active");
      }
    });
  });
});