fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');
    const checkboxes = document.querySelectorAll('input[data-filter]');
    const tagsContainer = document.getElementById('tags-container');
    
    // Define tags
    const tags = [
      { key: "spiritual", label: "Spiritual" },
      { key: "music", label: "Music" },
      { key: "hobby", label: "Hobby" },
      { key: "ponder", label: "Shower thoughts" },
      { key: "nonsense", label: "Bunch of nonsense innit" }
    ];

    // Active filters
    const activeFilters = new Set();
    const activeTags = new Set();

    // Calculate stats
    function updateStats() {
      const total = posts.length;
      const audioPosts = posts.filter(p => p.audio).length;
      const starredPosts = posts.filter(p => p.starred).length;
      const explicitPosts = posts.filter(p => p.explicit).length;
      
      document.getElementById('total-posts').textContent = total;
      document.getElementById('audio-posts').textContent = audioPosts;
      document.getElementById('starred-posts').textContent = starredPosts;
      document.getElementById('explicit-posts').textContent = explicitPosts;
    }

    // Create tag buttons
    tags.forEach(tag => {
      const button = document.createElement('button');
      button.textContent = tag.label;
      button.className = "text-sm border border-gray-300 rounded-full px-3 py-1.5 hover:bg-gray-100 transition data-[active=true]:bg-gray-800 data-[active=true]:text-white";
      button.dataset.active = "false";
      button.dataset.tag = tag.key;

      button.addEventListener('click', () => {
        const isActive = button.dataset.active === "true";
        button.dataset.active = String(!isActive);
        
        if (isActive) {
          activeTags.delete(tag.key);
        } else {
          activeTags.add(tag.key);
        }
        
        renderPosts();
      });

      tagsContainer.appendChild(button);
    });

    // Checkbox filter handlers
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const filterKey = checkbox.dataset.filter;
        
        if (checkbox.checked) {
          activeFilters.add(filterKey);
        } else {
          activeFilters.delete(filterKey);
        }
        
        renderPosts();
      });
    });

    // Render posts
    function renderPosts() {
      let filtered = [...posts];
      
      // Apply checkbox filters (AND logic within same category)
      if (activeFilters.size > 0) {
        filtered = filtered.filter(post => 
          Array.from(activeFilters).every(key => post[key])
        );
      }
      
      // Apply tag filters (OR logic for tags)
      if (activeTags.size > 0) {
        filtered = filtered.filter(post => 
          Array.from(activeTags).some(tag => post[tag])
        );
      }

      container.innerHTML = filtered
        .map(
          (post, index) => `
<a href="post.html?id=${post.id}" class="block p-5 border-b border-gray-200 hover:shadow-sm transition-all opacity-0 animate-fade-in" style="animation-delay: ${index * 70}ms">
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <h3 class="text-xl font-extrabold text-black mb-2">${post.title}</h3>
      <h3 class="text-sm text-gray-500 mb-2">${post.date}</h3>
      <h3 class="text-gray-400 mb-4">${post.excerpt}</h3>
      
      <div class="flex items-center space-x-2">
        
        ${post.audio ? `
          <div class="flex border py-2 px-4 rounded-full items-center space-x-1 text-gray-600">
            <img src="./assets/audio.svg" alt="Audio Available" class="w-4 h-4">
            <span class="text-xs">Audio</span>
          </div>
        ` : ''}
        
        ${post.explicit ? `
          <div class="flex border py-2 px-4 rounded-full items-center space-x-1 text-red-600">
            <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4">
            <span class="text-xs">Explicit</span>
          </div>
        ` : ''}
        
        ${post.edited ? `
          <div class="flex border py-2 px-4 rounded-full items-center space-x-1 text-gray-600">
            <img src="./assets/edited.svg" alt="Edited" class="w-4 h-4">
            <span class="text-xs">Edited</span>
          </div>
        ` : ''}
      </div>
    </div>
    
    <div class="ml-4 flex items-center space-x-1">
      ${post.starred ? `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z"/>
        </svg>
      ` : ''}
    </div>
  </div>
</a>
`
        )
        .join("");

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center py-8 border border-gray-200 rounded-lg opacity-0 animate-fade-in">No posts match selected filters.</p>`;
      }
    }

    // Initial render and stats update
    updateStats();
    renderPosts();
  })
  .catch(err => console.error("Error loading posts:", err));