

// let API_KEY = "1be14230ed5b4618bf8494c7accbbf75";
const searchBox = document.querySelector("#search-box");
let apiData = [];
let newsContainer = document.querySelector("#news-container");
let newsCategory = document.querySelectorAll(".news-category");
let category = "general";
let country = 'in'
const fetchData = async (query) => {
  try {
    const responses = await fetch('./.env');
const text = await responses.text();
const envVars = text.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  acc[key] = value;
  return acc;
}, {});

const apiKey = envVars.API_KEY;
    let url = query
      ? `https://newsapi.org/v2/top-headlines?q=${query}&country=in&apiKey=${apiKey}`
      : ` https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    apiData = data.articles;
    newsCategories();
    uiUpdate();
  } catch (error) {
    console.log(error);
  }
};

function uiUpdate() {
  newsContainer.innerHTML = "";
  apiData.forEach((article) => {
    let card = document.createElement('div')
    card.className = 'card  w-96 bg-primary-content text-black  shadow-xl mb-5'
    let cardFigure = document.createElement('figure')
    let cardImage =  document.createElement('img')
    cardImage.className = ' h-[236px] '
    cardImage.setAttribute('src', article.urlToImage? article.urlToImage : 'https://images.unsplash.com/photo-1692611901268-8e24ed37ee15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1436&q=80')
    cardFigure.appendChild(cardImage)
    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    let cardTitle = document.createElement('h2')
    cardTitle.className = 'card-title'
    cardTitle.innerHTML =  JSON.stringify(article.title).slice(1, 10);
    cardBody.appendChild(cardTitle)
    let cardPara = document.createElement('p')
    cardPara.innerHTML = JSON.stringify(article.description).slice(1, 45);
    cardBody.appendChild(cardPara)
    let cardAction = document.createElement('div')
    cardAction.className = 'card-actions justify-end'
    let btn = document.createElement('a')
    btn.className ='btn btn-primary'
    btn.setAttribute('href',article.url)
    btn.innerHTML = 'ReadMore'
    cardAction.appendChild(btn)
    cardBody.appendChild(cardAction)
    card.appendChild(cardFigure)
    card.appendChild(cardBody)
    newsContainer.appendChild(card);
  });
}

searchBox.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    await fetchData(searchBox.value);
  }
});

function handleCategorySelection(categoryId) {
  category = categoryId;
  fetchData(); // Fetch news articles for the selected category
}
function newsCategories() {
  newsCategory.forEach((newscategory) => {
    newscategory.addEventListener("click", (e) => {
      category = e.currentTarget.dataset.id;
      handleCategorySelection(category);
    });
  });
}
fetchData();
