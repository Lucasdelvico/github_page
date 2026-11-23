const listaDestaques = [
  {
    id: 1,
    nome: "Guitarra Stratocaster Sunburst",
    categoria: "Guitarras",
    badge: "EM ALTA",
    preco: 1890,
    promo: true,
    img: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    nome: "Guitarra Les Paul Gold Top",
    categoria: "Guitarras",
    badge: "SÉRIES BN",
    preco: 2750,
    promo: false,
    img: "https://images.unsplash.com/photo-1516924962513-888b0b549b2f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    nome: "Contrabaixo Precision Bass",
    categoria: "Contrabaixos",
    badge: "OFERTA",
    preco: 1650,
    promo: true,
    img: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    nome: "Violão Folk Elétrico Aço",
    categoria: "Violão",
    badge: null,
    preco: 1240,
    promo: false,
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    nome: "Pedal Overdrive Warm Drive",
    categoria: "Pedais",
    badge: "OFERTA",
    preco: 540,
    promo: true,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    nome: "Correia de Couro Guitarra",
    categoria: "Acessórios",
    badge: null,
    preco: 149,
    promo: true,
    img: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?auto=format&fit=crop&w=800&q=80"
  }
];

const listaCordas = [
  {
    id: 7,
    nome: "Encordoamento Guitarra .010 Níquel",
    categoria: "Acessórios",
    badge: null,
    preco: 65,
    promo: false,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    nome: "Encordoamento Guitarra .009",
    categoria: "Acessórios",
    badge: "OFERTA",
    preco: 59,
    promo: true,
    img: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    nome: "Encordoamento Violão Aço .011",
    categoria: "Acessórios",
    badge: null,
    preco: 72,
    promo: false,
    img: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    nome: "Cabo P10 Blindado 4,5m",
    categoria: "Acessórios",
    badge: "OFERTA",
    preco: 119,
    promo: true,
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    nome: "Kit Palhetas Variadas",
    categoria: "Acessórios",
    badge: null,
    preco: 35,
    promo: false,
    img: "https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&w=800&q=80"
  }
];

const todosProdutos = [...listaDestaques, ...listaCordas];

let categoriaAtiva = "Todos";
let termoBusca = "";
let slideBanner = 0;
let carrinho = JSON.parse(localStorage.getItem("bn_cart_solar")) || [];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function carregarProdutos(produtos, idContainer) {
  const container = document.getElementById(idContainer);
  if (!produtos.length) {
    container.innerHTML = `<p class="empty-msg">Nenhum produto encontrado.</p>`;
    return;
  }

  container.innerHTML = produtos.map((prod) => `
    <div class="product-card">
      ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ""}
      <img src="${prod.img}" alt="${prod.nome}">
      <span class="product-cat">${prod.categoria}</span>
      <p class="product-name">${prod.nome}</p>
      <p class="product-price">${formatarPreco(prod.preco)}</p>
      <button type="button" class="add-btn" onclick="adicionarCarrinho(${prod.id})">Add to Cart</button>
    </div>
  `).join("");
}

function scrollSection(idContainer, direcao) {
  const container = document.getElementById(idContainer);
  container.scrollLeft += direcao * 260;
}

// Carrossel de banners
const track = document.getElementById("bannerTrack");
const totalSlides = track.children.length;
const dotsBox = document.getElementById("bannerDots");

dotsBox.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
  `<button type="button" class="banner-dot ${i === 0 ? "active" : ""}" onclick="irSlide(${i})"></button>`
).join("");

function irSlide(index) {
  slideBanner = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${slideBanner * 100}%)`;
  document.querySelectorAll(".banner-dot").forEach((d, i) => {
    d.classList.toggle("active", i === slideBanner);
  });
}

document.getElementById("bannerPrev").onclick = () => irSlide(slideBanner - 1);
document.getElementById("bannerNext").onclick = () => irSlide(slideBanner + 1);
setInterval(() => irSlide(slideBanner + 1), 6000);

// Filtros, busca e categorias
function atualizarProdutos() {
  const precoMax = Number(document.getElementById("priceFilter").value);
  const ordem = document.getElementById("sortFilter").value;
  const busca = termoBusca.trim().toLowerCase();

  const filtrarItem = (p) => {
    const bateCat =
      categoriaAtiva === "Todos" ||
      (categoriaAtiva === "Promoções" ? p.promo : p.categoria === categoriaAtiva);
    const batePreco = p.preco <= precoMax;
    const bateBusca = !busca || p.nome.toLowerCase().includes(busca) || p.categoria.toLowerCase().includes(busca);
    return bateCat && batePreco && bateBusca;
  };

  const ordenarLista = (lista) => {
    const copia = [...lista];
    if (ordem === "menor") copia.sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") copia.sort((a, b) => b.preco - a.preco);
    if (ordem === "az") copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    return copia;
  };

  document.getElementById("tituloDestaque").textContent =
    categoriaAtiva === "Todos" ? "Produtos em destaque" : categoriaAtiva;

  const baseDestaques =
    categoriaAtiva !== "Todos" && categoriaAtiva !== "Acessórios" && categoriaAtiva !== "Promoções"
      ? todosProdutos
      : listaDestaques;

  const destaques = ordenarLista(baseDestaques.filter(filtrarItem));
  const cordas = ordenarLista(listaCordas.filter(filtrarItem));

  document.getElementById("contadorItens").textContent = `${destaques.length + cordas.length} ITEMS`;

  carregarProdutos(destaques, "destaque");
  carregarProdutos(cordas, "cordas");
}

function selecionarCategoria(cat) {
  categoriaAtiva = cat;
  document.querySelectorAll("#navCategories a").forEach((a) => {
    a.classList.toggle("active", a.dataset.cat === cat);
  });
  atualizarProdutos();
}

document.querySelectorAll("#navCategories a").forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    selecionarCategoria(link.dataset.cat);
  };
});

document.getElementById("logoHome").onclick = (e) => {
  e.preventDefault();
  document.getElementById("clearFilterBtn").click();
};

const searchInput = document.getElementById("searchInput");
searchInput.oninput = () => {
  termoBusca = searchInput.value;
  atualizarProdutos();
};
document.getElementById("searchBtn").onclick = () => {
  termoBusca = searchInput.value;
  atualizarProdutos();
};

const filterBar = document.getElementById("filterBar");
document.getElementById("filterToggleBtn").onclick = () => {
  filterBar.hidden = !filterBar.hidden;
};
document.getElementById("priceFilter").onchange = atualizarProdutos;
document.getElementById("sortFilter").onchange = atualizarProdutos;
document.getElementById("clearFilterBtn").onclick = () => {
  categoriaAtiva = "Todos";
  termoBusca = "";
  searchInput.value = "";
  document.getElementById("priceFilter").value = "99999";
  document.getElementById("sortFilter").value = "padrao";
  selecionarCategoria("Todos");
};

// Carrinho
function salvarCarrinho() {
  localStorage.setItem("bn_cart_solar", JSON.stringify(carrinho));
  renderCarrinho();
}

function adicionarCarrinho(id) {
  const item = carrinho.find((c) => c.id === id);
  if (item) item.qtd++;
  else carrinho.push({ id, qtd: 1 });
  document.getElementById("cartMsg").textContent = "";
  salvarCarrinho();
}

function mudarQtd(id, delta) {
  const item = carrinho.find((c) => c.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter((c) => c.id !== id);
  salvarCarrinho();
}

function renderCarrinho() {
  const lista = document.getElementById("cartItems");
  let totalItens = 0;
  let totalValor = 0;

  if (!carrinho.length) {
    lista.innerHTML = `<p class="empty-msg">Seu carrinho está vazio.</p>`;
  } else {
    lista.innerHTML = carrinho.map((item) => {
      const prod = todosProdutos.find((p) => p.id === item.id);
      if (!prod) return "";
      totalItens += item.qtd;
      totalValor += prod.preco * item.qtd;
      return `
        <div class="cart-item">
          <img src="${prod.img}" alt="${prod.nome}">
          <div class="cart-item-info">
            <div>${prod.nome}</div>
            <strong>${formatarPreco(prod.preco * item.qtd)}</strong>
            <div class="cart-qty">
              <button type="button" onclick="mudarQtd(${prod.id}, -1)">-</button>
              <span>${item.qtd}</span>
              <button type="button" onclick="mudarQtd(${prod.id}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cartCount").textContent = totalItens;
  document.getElementById("cartTotal").textContent = formatarPreco(totalValor);
}

const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
document.getElementById("cartOpenBtn").onclick = () => {
  cartDrawer.classList.add("open");
  cartBackdrop.hidden = false;
};
document.getElementById("cartCloseBtn").onclick = cartBackdrop.onclick = () => {
  cartDrawer.classList.remove("open");
  cartBackdrop.hidden = true;
};
document.getElementById("checkoutBtn").onclick = () => {
  if (!carrinho.length) return;
  carrinho = [];
  salvarCarrinho();
  document.getElementById("cartMsg").textContent = "Compra concluída!";
};

// Modal de cadastro
const registerModal = document.getElementById("registerModal");
const modalBackdrop = document.getElementById("modalBackdrop");
document.getElementById("registerBtn").onclick = () => {
  registerModal.hidden = false;
  modalBackdrop.hidden = false;
};
document.getElementById("closeModalBtn").onclick = modalBackdrop.onclick = () => {
  registerModal.hidden = true;
  modalBackdrop.hidden = true;
};
document.getElementById("registerForm").onsubmit = (e) => {
  e.preventDefault();
  const nome = document.getElementById("regName").value.trim();
  document.getElementById("regMsg").textContent = `Cadastro realizado, ${nome}!`;
  e.target.reset();
};

window.onload = () => {
  atualizarProdutos();
  renderCarrinho();
};