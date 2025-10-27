document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("songs.json");
    
    if (!response.ok) {
      throw new Error(`Error al cargar songs.json: ${response.status}`);
    }
    
    const songs = await response.json();
    const grid = document.getElementById("moodGrid");
    const result = document.getElementById("result");

    grid.addEventListener("click", e => {
      if (!e.target.classList.contains("mood")) return;
      
      const mood = e.target.dataset.mood;
      
      // Verificar si el mood existe en el JSON
      if (!songs[mood] || !Array.isArray(songs[mood]) || songs[mood].length === 0) {
        result.innerHTML = `<p>No hay canciones disponibles para este estado de ánimo.</p>`;
        return;
      }

      const list = songs[mood];
      const songUrl = list[Math.floor(Math.random() * list.length)];

      // Extraer Track ID de forma más robusta
      let trackId;
      try {
        // Manejar diferentes formatos de URL de Spotify
        const urlParts = songUrl.split('/track/');
        if (urlParts.length > 1) {
          trackId = urlParts[1].split('?')[0].split('&')[0];
        } else {
          throw new Error("URL de Spotify no válida");
        }
      } catch (error) {
        console.error("Error al extraer Track ID:", error);
        result.innerHTML = `<p>Error al cargar la canción. URL no válida.</p>`;
        return;
      }

      // Verificar que el trackId tenga el formato correcto (22 caracteres alfanuméricos)
      if (!trackId || trackId.length !== 22 || !/^[a-zA-Z0-9]+$/.test(trackId)) {
        result.innerHTML = `<p>Error: ID de canción no válido.</p>`;
        return;
      }

      result.innerHTML = `
        <div class="song">
          <iframe src="https://open.spotify.com/embed/track/${trackId}" 
                  width="300" height="80" frameborder="0" 
                  allowtransparency="true" allow="encrypted-media">
          </iframe>
          <br>
          <a href="${songUrl}" target="_blank" class="spotify-link">Abrir en Spotify 🎵</a>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error al cargar la aplicación:", error);
    document.getElementById("result").innerHTML = `
      <p>Error al cargar las canciones. Por favor, recarga la página.</p>
    `;
  }
});