const API_KEY = "1be14230ed5b4618bf8494c7accbbf75";

const searchBox = document.getElementById("search-box");
const newsContainer = document.getElementById("news-container");
const newsCategories = document.querySelectorAll(".news-category");

let apiData = [];
let category = "general";
let country = "in";

async function fetchData(query) {
  const url = query
    ? `https://newsapi.org/v2/top-headlines?q=${query}&country=${country}&apiKey=${API_KEY}` 
    : `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  apiData = data.articles;

  updateUI();
}

function updateUI() {
  clearContainer(newsContainer);

  apiData.forEach(createNewsCard); 
}

function createNewsCard(article) {
  const card = createElement('div', 'card w-96 bg-primary-content text-black shadow-xl mb-5');
  
  const image = createElement('img', 'h-[236px]');
  image.src = article.urlToImage || defaultImage;
  
  const title = createElement('h2', 'card-title', article.title);
  
  const description = createElement('p', null, article.description);
  
  const readMoreLink = createElement('a', 'btn btn-primary', 'Read More');
  readMoreLink.href = article.url;

  appendToCard(card, image, title, description, readMoreLink);

  newsContainer.appendChild(card);
}

function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  return element;
}

function appendToCard(card, ...children) {
  children.forEach(child => card.appendChild(child));
}

function clearContainer(container) {
  container.innerHTML = '';
}

searchBox.addEventListener("keypress", async e => {
  if (e.key === "Enter") {
    await fetchData(searchBox.value);
  }
});

newsCategories.forEach(category => {
  category.addEventListener("click", e => {
    category = e.currentTarget.dataset.id;
    fetchData();
  });
});

fetchData();