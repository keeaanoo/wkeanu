const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

if (!postId) {
  document.getElementById('post').innerHTML = "<p>Post not found.</p>";
} else {
  fetch(`posts/${postId}.json`)
    .then(res => res.json())
    .then(post => {
      document.title = `${post.title} - wkeanu`;
      const article = document.getElementById('post');

      article.innerHTML = `
  <div class="flex flex-wrap items-center gap-2 mb-8">

    ${post.starred ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4 text-black-400">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z"/>
        </svg>
        <span class="text-sm">Marked by Keanu</span>
      </div>
    ` : ''}

    ${post.explicit ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg whitespace-nowrap">
        <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4" />
        <span class="text-sm">Explicit</span>
      </div>
    ` : ''}

    ${post.audio ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg whitespace-nowrap">
        <img src="./assets/audio.svg" alt="Audio available" class="w-4 h-4" />
        <span class="text-sm">Audio available</span>
      </div>
    ` : ''}

    ${post.edited ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg whitespace-nowrap">
        <img src="./assets/edited.svg" alt="Edited" class="w-4 h-4" />
        <span class="text-sm">Edited</span>
      </div>
    ` : ''}

  </div>

  <h1 class="text-3xl md:text-4xl font-black mb-1">${post.title}</h1>
  <h2 class="text-gray-500 mb-2 pb-4">${post.date}</h2>
    <h2 class="text-gray-400 mb-4 border-b pb-4">${post.excerpt}</h2>

  ${post.audioFile ? `
  <div id="audio-player" class="w-full mb-6 mt-6 flex gap-1.5 items-center py-2 pr-7 pl-2.5 border rounded-xl bg-gray-50">

<button id="play-btn"
  class="w-12 h-12 flex items-center justify-center rounded-full mx-0
         focus:outline-none focus:ring-0 active:outline-none active:ring-0
         [ -webkit-tap-highlight-color: transparent; ]">
  <img id="play-icon" src="./assets/play.svg" class="w-5 h-5" />
</button>

    <div class="flex-1">
      <div id="seek-bar-container" class="w-full h-1.5 bg-gray-300 rounded-full cursor-pointer">
        <div id="seek-bar" class="h-full bg-black rounded-full w-0"></div>
      </div>
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span id="current-time">0:00</span>
        <span id="duration">0:00</span>
      </div>
    </div>

    <audio id="audio" src="${post.audioFile}"></audio>
  </div>
  ` : ''}

  <div class="text-gray-800 leading-relaxed space-y-4">
    ${post.content}
  </div>
`;

      // Fade in
      setTimeout(() => article.classList.add("opacity-100"), 50);

      // AUDIO SCRIPT
      const audio = document.getElementById("audio");
      const playBtn = document.getElementById("play-btn");
      const playIcon = document.getElementById("play-icon");
      const seekBar = document.getElementById("seek-bar");
      const seekBarContainer = document.getElementById("seek-bar-container");
      const currentTimeEl = document.getElementById("current-time");
      const durationEl = document.getElementById("duration");

      if (audio) {
        function formatTime(sec) {
          const m = Math.floor(sec / 60);
          const s = Math.floor(sec % 60).toString().padStart(2, "0");
          return `${m}:${s}`;
        }

        playBtn.addEventListener("click", () => {
          if (audio.paused) {
            audio.play();
            playIcon.src = "./assets/pause.svg"; // ✅ Change to pause icon
          } else {
            audio.pause();
            playIcon.src = "./assets/play.svg"; // ✅ Change to play icon
          }
        });

        audio.addEventListener("timeupdate", () => {
          const progress = (audio.currentTime / audio.duration) * 100;
          seekBar.style.width = `${progress}%`;
          currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener("loadedmetadata", () => {
          durationEl.textContent = formatTime(audio.duration);
        });

        seekBarContainer.addEventListener("click", (e) => {
          const rect = seekBarContainer.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percentage = x / rect.width;
          audio.currentTime = percentage * audio.duration;
        });

        // ✅ Reset icon when audio ends
        audio.addEventListener("ended", () => {
          playIcon.src = "./assets/play.svg";
        });
      }
    })
    .catch(() => {
      document.getElementById('post').innerHTML = "<p>Failed to load post.</p>";
    });
}
