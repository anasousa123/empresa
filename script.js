let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionar(nome, preco){
    const index = carrinho.findIndex(item => item.nome===nome);
    if(index>-1){ carrinho[index].quantidade++; }
    else{ carrinho.push({nome, preco, quantidade:1}); }
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    atualizarCarrinho();
    abrirCarrinho();
}

function abrirCarrinho(){ document.getElementById("carrinho-lateral").classList.add("aberto"); atualizarCarrinho(); }
function fecharCarrinho(){ document.getElementById("carrinho-lateral").classList.remove("aberto"); }

function atualizarCarrinho(){
    const lista = document.getElementById("itens-carrinho");
    lista.innerHTML = "";
    carrinho.forEach((item,i)=>{
        const div = document.createElement("div");
        div.className = "item-carrinho";
        div.innerHTML = `
            <span>${item.nome} x ${item.quantidade} - R$ ${(item.preco*item.quantidade).toFixed(2)}</span>
            <div>
                <button onclick="alterarQuantidade(${i},-1)">-</button>
                <button onclick="alterarQuantidade(${i},1)">+</button>
            </div>
        `;
        lista.appendChild(div);
    });
    atualizarTotal();
}

function alterarQuantidade(index, delta){
    carrinho[index].quantidade += delta;
    if(carrinho[index].quantidade<=0){ carrinho.splice(index,1); }
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarTotal(){
    const bairroElem = document.getElementById("bairro");
    if(!bairroElem) return;
    const taxa = parseFloat(bairroElem.options[bairroElem.selectedIndex].dataset.taxa);
    let total = carrinho.reduce((sum,item)=>sum+item.preco*item.quantidade,0);
    document.getElementById("total-carrinho").innerText = (total+taxa).toFixed(2);
}

function finalizarPedido(){
    alert("Pedido finalizado! Total: R$ "+document.getElementById("total-carrinho").innerText);
    carrinho = [];
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    atualizarCarrinho();
    fecharCarrinho();
}