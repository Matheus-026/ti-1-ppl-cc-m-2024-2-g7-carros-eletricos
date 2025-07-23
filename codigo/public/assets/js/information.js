const apiKey = '8c1cddff6ba54d26a63fb1e50b53d1fa';
const url = `https://newsapi.org/v2/everything?q=carros+elétricos+vantagens&language=pt&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles) {
            displayNews(data.articles);
        } else {
            console.error("Nenhuma notícia encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    const highlightedArticleContainer = document.getElementById('highlighted-article');

    // Exibir a primeira notícia como destaque
    const highlightArticle = articles[0];
    highlightedArticleContainer.querySelector("img").src = highlightArticle.urlToImage || 'https://via.placeholder.com/800x400';
    highlightedArticleContainer.querySelector(".news-title").textContent = highlightArticle.title;
    highlightedArticleContainer.querySelector(".news-description").textContent = highlightArticle.description || 'Descrição indisponível';
    highlightedArticleContainer.querySelector(".news-link").href = highlightArticle.url;

    // Exibir as demais notícias como cards na grade
    articles.slice(1).forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');

        articleDiv.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="${article.title}">
            <div class="news-content">
                <h2 class="news-title">${article.title}</h2>
                <p class="news-description">${article.description || 'Descrição indisponível'}</p>
                <a href="${article.url}" target="_blank" class="news-link">Leia mais</a>
            </div>
        `;
        
        newsContainer.appendChild(articleDiv);
    });
}

// Chama a função para buscar notícias ao carregar a página
fetchNews();
