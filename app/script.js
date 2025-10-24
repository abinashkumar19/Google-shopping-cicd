const products = [
{id:1,title:'Wireless Earbuds',price:1999,img:'https://via.placeholder.com/200?text=Earbuds'},
{id:2,title:'Smartwatch X',price:4999,img:'https://via.placeholder.com/200?text=Smartwatch'},
{id:3,title:'4K Monitor',price:15999,img:'https://via.placeholder.com/200?text=Monitor'},
{id:4,title:'Bluetooth Speaker',price:2999,img:'https://via.placeholder.com/200?text=Speaker'}
];


function renderProducts(list) {
const container = document.getElementById('products');
container.innerHTML = '';
list.forEach(p => {
const div = document.createElement('div');
div.className = 'card';
div.innerHTML = `
<img src="${p.img}" alt="${p.title}">
<h3>${p.title}</h3>
<p>₹${p.price}</p>
<button>Add to Cart</button>
`;
container.appendChild(div);
});
}


renderProducts(products);
