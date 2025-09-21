// Grimório de Lilith — cart + small UX helpers
(function(){
  const PIX_KEY = 'c12c2e94-3b21-48d1-b09f-62c6d1761b15';

  
// Storefront / External link config (easy to edit later)
const LINK_CONFIG = {
  "p0": { br: "https://www.amazon.com.br/Grimório-Lilith-1-Guilherme-Vale-ebook/dp/B0FB6VW5PJ?dplnkId=fb888d53-db47-4e01-b824-45f93dcf9c26&nodl=1" }, // Vol I
  "p1": { br: "", us: "" }, // Vol II (preencher quando tiver)
  "p2": { br: "", us: "" }, // Contos Ato I
  "p3": { br: "", us: "" }  // Poemas Abba
,
  "pEN": { en: "https://www.amazon.com.br/Grimoire-Lilith-Ritual-Remembering-English-ebook/dp/B0FBH24SHK/ref=mp_s_a_1_1?crid=1RNSM619BGY2N&dib=eyJ2IjoiMSJ9.19fKduVi2q-kuqSFUp8tP9-XwwHdiV0kx_CFRDfBk0MjyVnfMxnCqIQ-EH6wbfxfN1acifZaEViZKWHbiDTcMCJVQaW2mpziQ1qEx3E206znBpJIGVU2lXvgHVn-TQRDWVGJsy-DuS5QtO3ZsRa_ODPxCi_yqdyiVe3R_VZvveiz3-C8CFgiR7dkyMHi7F1LJzVFntDwUKPvHG6zSbTMpg.wximXX4rY8GBVj8E42_pg8bGDUXouw2flzhGMb5tRVg&dib_tag=se&keywords=grimoire+lilith&qid=1758458858&s=digital-text&sprefix=grimoire+lilit%2Cdigital-text%2C447&sr=1-1" }
};


  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const fmtBRL = n => n.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
  const LS_KEY = 'grimorio_cart_v1';

  const cart = {
    items: [],
    load(){
      try{
        this.items = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      }catch(e){ this.items = []; }
      render();
    },
    save(){ localStorage.setItem(LS_KEY, JSON.stringify(this.items)); updateCount(); },
    add(p){
      const idx = this.items.findIndex(i => i.id === p.id);
      if(idx >= 0) this.items[idx].qty += 1;
      else this.items.push({id:p.id, name:p.name, price:p.price, qty:1});
      this.save(); openCart();
    },
    inc(id){ const it = this.items.find(i=>i.id===id); if(it){ it.qty++; this.save(); render(); } },
    dec(id){ const it = this.items.find(i=>i.id===id); if(it){ it.qty--; if(it.qty<=0){ this.remove(id); } else { this.save(); render(); } } },
    remove(id){ this.items = this.items.filter(i=>i.id!==id); this.save(); render(); },
    clear(){ this.items = []; this.save(); render(); },
    total(){ return this.items.reduce((a,b)=>a + b.price*b.qty, 0); }
  };

  function updateCount(){
    const count = cart.items.reduce((a,b)=>a+b.qty,0);
    const el = $('#cartCount'); if(el) el.textContent = count;
  }

  function render(){
    const box = $('#cartItems'); if(!box) return;
    box.innerHTML = '';
    if(cart.items.length === 0){
      box.innerHTML = '<p class="muted">seu carrinho está vazio.</p>';
    } else {
      cart.items.forEach(it => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div><strong>${it.name}</strong><br><small>R$ ${fmtBRL(it.price)}</small></div>
          <div class="qty">
            <button class="icon-btn" data-dec="${it.id}" aria-label="Diminuir">–</button>
            <span>${it.qty}</span>
            <button class="icon-btn" data-inc="${it.id}" aria-label="Aumentar">+</button>
          </div>
          <button class="icon-btn" data-rem="${it.id}" aria-label="Remover">✕</button>
        `;
        box.appendChild(row);
      });
    }
    $('#cartTotal').textContent = fmtBRL(cart.total());
    bindCartRows();
  }

  function bindCartRows(){
    $$('#cartItems [data-inc]').forEach(b=>b.addEventListener('click', e=>cart.inc(e.currentTarget.getAttribute('data-inc'))));
    $$('#cartItems [data-dec]').forEach(b=>b.addEventListener('click', e=>cart.dec(e.currentTarget.getAttribute('data-dec'))));
    $$('#cartItems [data-rem]').forEach(b=>b.addEventListener('click', e=>cart.remove(e.currentTarget.getAttribute('data-rem'))));
  }

  function openCart(){ const p = $('#cartPanel'); if(p){ p.classList.add('open'); p.setAttribute('aria-hidden','false'); } }
  function closeCart(){ const p = $('#cartPanel'); if(p){ p.classList.remove('open'); p.setAttribute('aria-hidden','true'); } }

  // bind global UI
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-product]')){
      try{
        const p = JSON.parse(t.getAttribute('data-product'));
        cart.add(p);
      }catch(_){}
    }
    if(t.id === 'cartButton'){ e.preventDefault(); openCart(); }
    if(t.id === 'closeCart'){ e.preventDefault(); closeCart(); }
    if(t.id === 'clearCart'){ cart.clear(); }
  });

  // checkout via email
  const checkoutBtn = $('#checkoutBtn');
  if(checkoutBtn){
    checkoutBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if(cart.items.length === 0) return;
      const lines = cart.items.map(i => `• ${i.name} — ${i.qty} x R$ ${fmtBRL(i.price)}`).join('%0A');
      const total = fmtBRL(cart.total());
      const body = `Olá, quero finalizar a compra:%0A%0A${lines}%0A%0ATotal: R$ ${total}%0A%0ANome: %0AForma de pagamento preferida: `;
      const mailto = `mailto:contato+grimorio@soneca.dev?subject=Pedido%20—%20Grim%C3%B3rio%20de%20Lilith&body=${body}`;
      window.location.href = mailto;
    });
  }

  // year
  const y = new Date().getFullYear();
  const yEl = $('#year'); if(yEl) yEl.textContent = y;

  

  // toast helper
  function showToast(msg){
    let t = document.querySelector('.toast');
    if(!t){ t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2200);
  }

  async function copyPix(){
    try{
      await navigator.clipboard.writeText(PIX_KEY);
      showToast('Chave Pix copiada: ' + PIX_KEY);
    }catch(e){
      showToast('Copie esta chave Pix: ' + PIX_KEY);
      alert('Copie esta chave Pix: ' + PIX_KEY);
    }
  }

  // bind donate buttons
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t && (t.hasAttribute('data-donate') || t.id === 'donateBtnCart')){
      e.preventDefault();
      copyPix();
    }
  });

  cart.load();
  render();
})();