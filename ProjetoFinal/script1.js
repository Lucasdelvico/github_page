
// Função para renderizar os produtos na tela
function carregarProdutos(produtos, idContainer) {
    const container = document.getElementById(idContainer);
    container.innerHTML = produtos.map(prod => `
        <div class="product-card">
            <img src="${prod.img}" alt="${prod.nome}">
            <p class="product-name">${prod.nome}</p>
            <p class="product-price">${prod.preco}</p>
        </div>
    `).join('');
}

// Carrossel
function scrollSection(idContainer, direcao) {
    const container = document.getElementById(idContainer);
    const scrollAmount = 250; // Distância do clique em pixels
    container.scrollLeft += (direcao * scrollAmount);
}

// Inicializa as seções ao carregar a página
window.onload = () => {
    carregarProdutos(listaDestaques, 'destaque');
    carregarProdutos(listaCordas, 'cordas');
};
