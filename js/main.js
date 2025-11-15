fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');

    // --- Create filter bar ---
    const filterBar = document.createElement('div');
    filterBar.className = "flex flex-wrap gap-2 mb-6";

    const filters = [
      { key: "starred", label: "Marked by Keanu" },
      { key: "audio", label: "Audio available" },
      { key: "explicit", label: "Explicit" },
      { key: "spiritual", label: "Spiritual" },
    ];

    const activeFilters = new Set();

    filters.forEach(f => {
      const btn = document.createElement('button');
      btn.textContent = f.label;
      btn.className =
        "text-sm border border-gray-300 rounded-full px-3 py-1 transition " +
        "hover:bg-gray-100 data-[active=true]:bg-black data-[active=true]:text-white";

      btn.dataset.active = "false";

      btn.addEventListener("click", () => {
        const isActive = btn.dataset.active === "true";
        btn.dataset.active = String(!isActive);
        if (isActive) activeFilters.delete(f.key);
        else activeFilters.add(f.key);
        renderPosts();
      });

      filterBar.appendChild(btn);
    });

    // --- Render posts ---
    function renderPosts() {
      let filtered = [...posts];
      if (activeFilters.size > 0) {
        filtered = filtered.filter(post =>
          Array.from(activeFilters).every(key => post[key])
        );
      }

      container.innerHTML = filtered
        .map(
          post => `
<a href="post.html?id=${post.id}" class="block px-5 py-5 hover:bg-gray-50 transition">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-extrabold text-gray-800 hover:text-black">${post.title}</h3>

    <div class="flex items-center space-x-2 ml-2">
      ${
        post.starred
          ? `<span class="relative group inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                   viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                   class="w-4 h-4 text-black-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z"/>
              </svg>
              <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
                Marked by Keanu
              </span>
            </span>`
          : ""
      }
      ${
        post.audio
          ? `<span class="relative group inline-block">
              <img src="./assets/audio.svg" alt="Audio Available" class="w-4 h-4" />
              <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
                Audio Available
              </span>
            </span>`
          : ""
      }
      ${
        post.explicit
          ? `<span class="relative group inline-block">
              <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4" />
              <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
                Explicit
              </span>
            </span>`
          : ""
      }

    </div>
  </div>

  <h2 class="text-sm text-gray-500 mb-3">${post.date}</h2>
  <h2 class="text-gray-400 text-bold mt-1">${post.excerpt}</h2>
</a>
`
        )
        .join("");

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center py-6">No posts match selected filters.</p>`;
      }
    }

    // --- Insert filter bar before posts ---
    container.parentNode.insertBefore(filterBar, container);

    // --- Initial render ---
    renderPosts();
  })
  .catch(err => console.error("Error loading posts:", err));
