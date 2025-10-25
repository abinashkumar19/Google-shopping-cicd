const products = [
  { title: "Pixel 8 Pro", price: 79999, img: "https://store.google.com/product-images/pixel8pro.jpg" },
  { title: "Pixel Buds Pro", price: 19999, img: "https://store.google.com/product-images/pixelbudspro.jpg" },
  { title: "Nest Hub Max", price: 22999, img: "https://store.google.com/product-images/nesthubmax.jpg" },
  { title: "Chromecast 4K", price: 4999, img: "https://store.google.com/product-images/chromecast.jpg" }
];

const app = document.getElementById("app");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.title}" />
    <h2>${p.title}</h2>
    <p>₹${p.price.toLocaleString()}</p>
  `;
  app.appendChild(div);
});
