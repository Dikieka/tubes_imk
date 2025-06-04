const API_KEY = "535c2784b28c81e7b06adcbd236136d2";
const NEWS_API_URL = `https://gnews.io/api/v4/top-headlines?lang=id&max=6&token=${API_KEY}`;

async function fetchNews() {
  try {
    const res = await fetch(NEWS_API_URL);
    const data = await res.json();
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML =
        "<p class='text-center'>Tidak ada berita ditemukan.</p>";
      return;
    }

    data.articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${
            article.image || "https://via.placeholder.com/400x200?text=No+Image"
          }" class="card-img-top" alt="Gambar Berita">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description || ""}</p>
            <a href="${
              article.url
            }" target="_blank" class="btn btn-primary mt-auto">Baca Selengkapnya</a>
          </div>
        </div>
      `;

      newsContainer.appendChild(col);
    });
  } catch (err) {
    console.error("Gagal mengambil berita:", err);
    document.getElementById("news-container").innerHTML =
      "<p class='text-danger text-center'>Gagal mengambil berita.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchNews);
