document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("songs.json");
  const songs = await response.json();

  const grid = document.getElementById("moodGrid");
  const result = document.getElementById("result");

  grid.addEventListener("click", e => {
    if (!e.target.classList.contains("mood")) return;
    const mood = e.target.dataset.mood;
    const list = songs[mood];
    const songUrl = list[Math.floor(Math.random() * list.length)];

    // Extraer Track ID de la URL de Spotify
    const trackId = songUrl.split("/track/")[1].split("?")[0];

    result.innerHTML = `
      <div class="song">
        <iframe src="https://open.spotify.com/track/${trackId}" 
                width="300" height="80" frameborder="0" allowtransparency="true" 
                allow="encrypted-media">
        </iframe>
        <a href="${songUrl}" target="_blank">Abrir en Spotify 🎵</a>
      </div>
    `;
  });
});
