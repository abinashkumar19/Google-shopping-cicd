// simple client-side product renderer + cart
const CART_KEY = 'shopdemo_cart_v1';
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||{} }catch(e){return{}} }
function setCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
function updateCartCount(){
  const total = Object.values(getCart()).reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cartCountBtn').forEach(el=>el.textContent=`Cart (${total})`);
  const modalCount = document.getElementById('cartTotal');
  if(modalCount) modalCount.textContent = Object.values(getCart()).reduce((s,i)=>s+i.qty*i.price,0);
}
function addToCart(product){
  const cart = getCart();
  if(!cart[product.id]) cart[product.id] = {...product, qty:0};
  cart[product.id].qty += 1;
  setCart(cart);
  animateCart();
}
function removeFromCart(id){
  const cart = getCart(); delete cart[id]; setCart(cart);
}
function changeQty(id,delta){
  const cart = getCart(); if(!cart[id]) return; cart[id].qty += delta; if(cart[id].qty<=0) delete cart[id]; setCart(cart);
}
function openCart(){
  document.getElementById('cartModal').classList.remove('hidden'); renderCartItems();
}
function closeCart(){ document.getElementById('cartModal').classList.add('hidden'); }

function animateCart(){
  const btn = document.getElementById('cartCountBtn');
  if(!btn) return;
  btn.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:220});
}

function renderProducts(products, container){
  container.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div'); el.className='product';
    const img = `<img src="${p.img || 'data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=600 height=360><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f6f8fb\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=20 fill=\\'%23333\\'>${encodeURIComponent(p.title)}</text></svg>'}" alt="">`;
    el.innerHTML = `
      ${img}
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><strong>${p.title}</strong><div class="meta">${p.desc || ''}</div></div>
        <div style="text-align:right"><div style="font-weight:800">$${p.price}</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn" onclick='addToCart(${JSON.stringify(p).replace(/'/g,"\\'")})'>Add</button>
        <button class="btn outline" onclick='viewDetails(${JSON.stringify(p).replace(/'/g,"\\'")})'>View</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function viewDetails(p){
  alert(`${p.title}\n\n${p.desc}\n\nPrice: $${p.price}`);
}

function renderCartItems(){
  const container = document.getElementById('cartItems');
  container.innerHTML = '';
  const cart = getCart();
  const items = Object.values(cart);
  if(items.length===0){ container.innerHTML = '<div class="meta">Your cart is empty</div>'; return }
  items.forEach(i=>{
    const el = document.createElement('div'); el.className='cart-item';
    el.innerHTML = `
      <div style="flex:1">
        <div class="title">${i.title}</div>
        <div class="meta">$${i.price} • Qty: ${i.qty}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn outline" onclick='changeQty("${i.id}",1)'>+</button>
        <button class="btn outline" onclick='changeQty("${i.id}",-1)'>-</button>
        <button class="btn" onclick='removeFromCart("${i.id}")'>Remove</button>
      </div>
    `;
    container.appendChild(el);
  });
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('#cartCountBtn').forEach(el=>el.addEventListener('click', openCart));
  document.querySelectorAll('#closeCartBtn').forEach(el=>el.addEventListener('click', closeCart));
  document.getElementById('checkoutBtn')?.addEventListener('click', ()=>{ alert('Demo checkout — static prototype.'); });
  updateCartCount();
});
