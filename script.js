const views = ["loginView", "registerView", "productsView", "paymentView", "confirmView"];
function showView(id){
  views.forEach(v => document.getElementById(v).classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function flash(type = "success", message = ""){
  const container = document.getElementById("flash");
  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show alert-floating" role="alert">
      <i class="bi ${type === "success" ? "bi-check-circle" : "bi-info-circle"} me-1"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

(function enableValidation(){
  document.querySelectorAll(".needs-validation").forEach(form => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });
})();

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!loginForm.checkValidity()) return;
  showView("productsView");
  flash("success", "Seja Bem Vindo!");
});

document.getElementById("btnCadastro").addEventListener("click", () => {
  showView("registerView");
});

const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!registerForm.checkValidity()) return;
  showView("loginView");
  flash("success", "Cadastro salvo (simulado). Faça o login para continuar.");
  registerForm.reset();
  registerForm.classList.remove("was-validated");
});

function maskCPF(v){
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskCEP(v){
  return v.replace(/\D/g, "").slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
}
const cpfInput = document.getElementById("cpf");
const cepInput = document.getElementById("cep");
[cpu=cpfInput, cpe=cepInput];
cpfInput.addEventListener("input", (e) => {
  const pos = e.target.selectionStart;
  e.target.value = maskCPF(e.target.value);
  e.target.setSelectionRange(pos, pos);
});
cepInput.addEventListener("input", (e) => {
  const pos = e.target.selectionStart;
  e.target.value = maskCEP(e.target.value);
  e.target.setSelectionRange(pos, pos);
});

const state = {
  carrinho: {},
};

const BRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CATALOGO = [
  { id:1,  nome:"Fone Bluetooth",        preco:129.9,  modelo:"TWS X2",   marca:"Acme",   cor:"Preto",  foto:"https://picsum.photos/seed/fone/600/600",   rating:4.5 },
  { id:2,  nome:"Teclado Mecânico",      preco:289.0,  modelo:"MK-Pro",   marca:"KeyLab", cor:"Branco", foto:"https://picsum.photos/seed/teclado/600/600",rating:4.7 },
  { id:3,  nome:"Mouse Gamer",           preco:159.9,  modelo:"GX-9",     marca:"KeyLab", cor:"Preto",  foto:"https://picsum.photos/seed/mouse/600/600",  rating:4.3 },
  { id:4,  nome:"Monitor 24\"",          preco:899.0,  modelo:"IPS-24",   marca:"ViewX",  cor:"Preto",  foto:"https://picsum.photos/seed/monitor/600/600",rating:4.6 },
  { id:5,  nome:"SSD 1TB NVMe",          preco:499.9,  modelo:"NVX-1",    marca:"Speedy", cor:"—",      foto:"https://picsum.photos/seed/ssd/600/600",    rating:4.8 },
  { id:6,  nome:"Notebook 15\"",         preco:3499.0, modelo:"Note-15",  marca:"Acme",   cor:"Cinza",  foto:"https://picsum.photos/seed/note/600/600",   rating:4.2 },
  { id:7,  nome:"Câmera Web HD",         preco:229.0,  modelo:"Web-HD",   marca:"PhotoX", cor:"Preto",  foto:"https://picsum.photos/seed/webcam/600/600", rating:4.1 },
  { id:8,  nome:"Microfone Condensador", preco:379.0,  modelo:"Mic-C1",   marca:"AudioX", cor:"Preto",  foto:"https://picsum.photos/seed/mic/600/600",     rating:4.4 },
  { id:9,  nome:"Caixa de Som BT",       preco:199.9,  modelo:"Beat-Go",  marca:"Acme",   cor:"Azul",   foto:"https://picsum.photos/seed/speaker/600/600",rating:4.0 },
  { id:10, nome:"Smartwatch",            preco:699.0,  modelo:"Fit-S2",   marca:"TimeX",  cor:"Preto",  foto:"https://picsum.photos/seed/watch/600/600",  rating:4.6 },
  { id:11, nome:"Carregador 65W",        preco:149.0,  modelo:"Power-65", marca:"Volt",   cor:"Branco", foto:"https://picsum.photos/seed/charger/600/600",rating:4.5 },
  { id:12, nome:"Cabo USB-C 2m",         preco:39.9,   modelo:"UC-2M",    marca:"Volt",   cor:"Preto",  foto:"https://picsum.photos/seed/cable/600/600",  rating:4.2 },
];

const productGrid = document.getElementById("productGrid");
function renderProducts(){
  productGrid.innerHTML = "";
  CATALOGO.forEach(p => {
    const idQtd = `qtd-${p.id}`;
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4";
    col.innerHTML = `
      <div class="card prod-card h-100 shadow-sm">
        <img class="prod-img" src="${p.foto}" alt="${p.nome}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h3 class="h6 mb-1">${p.nome}</h3>
          <div class="text-muted small mb-2">
            Modelo <b>${p.modelo}</b> · Marca <b>${p.marca}</b> · Cor <b>${p.cor}</b>
          </div>
          <div class="rating mb-2">
            ${stars(p.rating)} <span class="text-muted small ms-1">${p.rating.toFixed(1)}</span>
          </div>
          <div class="fw-bold mb-2">${BRL(p.preco)}</div>
          <div class="mt-auto d-flex align-items-center gap-2">
            <label for="${idQtd}" class="form-label m-0 small">Qtd</label>
            <input id="${idQtd}" type="number" min="0" value="${state.carrinho[p.id] ?? 0}" class="form-control form-control-sm" style="max-width:96px">
            <button class="btn btn-primary btn-sm ms-auto"><i class="bi bi-plus-lg me-1"></i>Adicionar</button>
          </div>
        </div>
      </div>
    `;
    productGrid.appendChild(col);

    const qtdEl = col.querySelector("input");
    const btn = col.querySelector("button");
    btn.addEventListener("click", () => {
      const qtd = Math.max(0, parseInt(qtdEl.value || "0", 10));
      if (qtd <= 0) delete state.carrinho[p.id];
      else state.carrinho[p.id] = qtd;
      updateCartUI();
      flash("success", "Carrinho atualizado.");
    });
  });
}
function stars(rating) {
  rating = Math.max(0, Math.min(5, rating));

  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const fullStars  = "★".repeat(full);
  const halfStars  = half ? "☆" : "";
  const emptyStars = "☆".repeat(empty);

  return (fullStars + halfStars + emptyStars)
    .split("")
    .map(ch => `<i class="bi ${ch === "★" ? "bi-star-fill" : "bi-star"}"></i>`)
    .join("");
}

const cartCount = document.getElementById("cartCount");
const goToPayBtn = document.getElementById("goToPay");
goToPayBtn.addEventListener("click", () => {
  renderCartSummary();
  showView("paymentView");
});

function updateCartUI(){
  const totalItens = Object.values(state.carrinho).reduce((a,b)=>a+b,0);
  cartCount.textContent = totalItens;
  goToPayBtn.disabled = totalItens === 0;
}

const cartSummary = document.getElementById("cartSummary");
const cartTotal = document.getElementById("cartTotal");
function renderCartSummary(){
  const entries = Object.entries(state.carrinho);
  if (!entries.length){
    cartSummary.innerHTML = `<p class="text-muted mb-0">Seu carrinho está vazio.</p>`;
    cartTotal.textContent = BRL(0);
    return;
  }
  let total = 0;
  cartSummary.innerHTML = entries.map(([id,q])=>{
    const p = CATALOGO.find(x=>x.id==id);
    const sub = p.preco * q;
    total += sub;
    return `
      <div class="d-flex justify-content-between border-bottom py-2">
        <div>
          <div class="fw-semibold">${p.nome}</div>
          <div class="text-muted small">Qtd: ${q} · ${BRL(p.preco)}</div>
        </div>
        <div class="fw-semibold">${BRL(sub)}</div>
      </div>`;
  }).join("");
  cartTotal.textContent = BRL(total);
}

const numeroCartao = document.getElementById("numeroCartao");
const expiracao = document.getElementById("expiracao");
const cvv = document.getElementById("cvv");
numeroCartao?.addEventListener("input", (e)=>{
  e.target.value = e.target.value.replace(/\D/g,"").slice(0,19).replace(/(\d{4})(?=\d)/g,"$1 ").trim();
});
expiracao?.addEventListener("input",(e)=>{
  e.target.value = e.target.value.replace(/\D/g,"").slice(0,4).replace(/(\d{2})(\d{0,2})/,(_,m,a)=> a?`${m}/${a}`:m);
});
cvv?.addEventListener("input",(e)=>{
  e.target.value = e.target.value.replace(/\D/g,"").slice(0,4);
});

document.getElementById("voltarProdutos").addEventListener("click", ()=>{
  showView("productsView");
});

const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  if (!paymentForm.checkValidity()) return;

  const bandeira = document.getElementById("bandeira").value;

  const itens = Object.entries(state.carrinho).map(([id,q])=>{
    const p = CATALOGO.find(x=>x.id==id);
    return { nome:p.nome, qtd:q, preco:p.preco, sub:p.preco*q };
  });
  const total = itens.reduce((a,i)=>a+i.sub,0);

  const confirmData = document.getElementById("confirmData");
  confirmData.innerHTML = `
    <div class="table-responsive">
      <table class="table table-sm align-middle">
        <thead>
          <tr><th>Produto</th><th class="text-end">Qtd</th><th class="text-end">Preço</th><th class="text-end">Subtotal</th></tr>
        </thead>
        <tbody>
          ${itens.map(i=>`
            <tr>
              <td>${i.nome}</td>
              <td class="text-end">${i.qtd}</td>
              <td class="text-end">${BRL(i.preco)}</td>
              <td class="text-end">${BRL(i.sub)}</td>
            </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">Forma de pagamento</th>
            <td class="text-end">${bandeira}</td>
          </tr>
          <tr>
            <th colspan="3" class="text-end">Total</th>
            <td class="text-end fw-bold">${BRL(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="mt-3 alert alert-success" role="status">Compra realizada com sucesso! 🎉</p>
  `;


  state.carrinho = {};
  updateCartUI();
  showView("confirmView");
});

document.getElementById("continuarComprando").addEventListener("click", ()=>{
  showView("productsView");
});
document.getElementById("sair").addEventListener("click", ()=>{
  showView("loginView");
});

renderProducts();
showView("loginView");
