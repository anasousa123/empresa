let carrinho = [];
let total = 0;

function addItem(preco, nome) {
    carrinho.push({nome, preco});
    total += preco;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('