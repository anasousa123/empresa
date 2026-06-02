let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionar(nome, preco){

carrinho.push({
nome,
preco
});

localStorage.setItem(
"carrinho",
JSON.stringify(carrinho)
);

alert(nome + " adicionado!");
}

function mostrarCarrinho(){

let area =
document.getElementById("carrinho");

let total = 0;

carrinho.forEach(item => {

area.innerHTML += `
<p>
${item.nome}
- R$ ${item.preco}
</p>
`;

total += item.preco;

});

let taxa = 5;

document.getElementById(
"total"
).innerHTML =
`Total + entrega:
R$ ${total + taxa}`;

}