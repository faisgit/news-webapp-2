const API_KEY = "1be14230ed5b4618bf8494c7accbbf75";

const searchBox = document.getElementById("search-box");
const newsContainer = document.getElementById("news-container");
const newsCategories = document.querySelectorAll(".news-category");

let apiData = [];
let category = "general";
let country = "in";

async function fetchNews(query) {
  const url = buildUrl(query);
  const response = await fetch(url);
  const data = await response.json();

  apiData = data.articles;
  
  updateUI();
}

function buildUrl(query) {
  return query 
    ? `https://newsapi.org/v2/top-headlines?q=${query}&country=${country}&apiKey=${API_KEY}` 
    : `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${API_KEY}`;
}

function updateUI() {
  clearContainer(newsContainer);

  apiData.forEach(createNewsCard); 
}

function createNewsCard(article) {
  const card = document.createElement('div');
  card.className = 'card';

  const image = document.createElement('img');
  image.src = article.urlToImage || defaultImage;
  card.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = article.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = article.description;
  card.appendChild(description);

  const link = document.createElement('a');
  link.textContent = 'Read more';
  link.href = article.url;
  card.appendChild(link);

  newsContainer.appendChild(card);
}

function clearContainer(container) {
  container.innerHTML = ""; 
}

// Event listeners

fetchNews();