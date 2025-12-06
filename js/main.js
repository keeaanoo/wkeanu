fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');
    const checkboxes = document.querySelectorAll('input[data-filter]');
    const tagsContainer = document.getElementById('tags-container');
    const resetButton = document.getElementById('reset-filters');
    
    // Get count elements
    const showingCountElement = document.getElementById('showing-count');
    const totalCountElement = document.getElementById('total-count');
    
    // Define tags
    const tags = [
      { key: "nonsense", label: "Bunch of nonsense innit" },
      { key: "spiritual", label: "Spiritual" },
      { key: "music", label: "Music" },
      { key: "art", label: "Art" },
      { key: "ponder", label: "Shower thoughts" },
      { key: "hobby", label: "Hobby" }
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
      
      // Update total count
      totalCountElement.textContent = total;
    }

    // Update showing count
    function updateShowingCount(count) {
      showingCountElement.textContent = count;
    }

    // Reset all filters
    function resetAllFilters() {
      // Reset checkboxes
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Reset active filters sets
      activeFilters.clear();
      activeTags.clear();
      
      // Reset tag buttons
      const tagButtons = document.querySelectorAll('[data-tag]');
      tagButtons.forEach(button => {
        button.dataset.active = "false";
        button.classList.remove('bg-gray-800', 'text-white');
        button.classList.add('border-gray-300', 'hover:bg-gray-100');
      });
      
      // Re-render posts
      renderPosts();
    }

    // Create tag buttons
    tags.forEach(tag => {
      const button = document.createElement('button');
      button.textContent = tag.label;
      button.className = "text-sm border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-100 transition";
      button.dataset.active = "false";
      button.dataset.tag = tag.key;

      button.addEventListener('click', () => {
        const isActive = button.dataset.active === "true";
        button.dataset.active = String(!isActive);
        
        if (isActive) {
          activeTags.delete(tag.key);
          button.classList.remove('bg-gray-800', 'text-white');
          button.classList.add('border-gray-300', 'hover:bg-gray-100');
        } else {
          activeTags.add(tag.key);
          button.classList.add('bg-gray-800', 'text-white');
          button.classList.remove('border-gray-300', 'hover:bg-gray-100');
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

    // Reset button handler
    if (resetButton) {
      resetButton.addEventListener('click', resetAllFilters);
    }

    // Render posts
    function renderPosts() {
      let filtered = [...posts];
      
      // Apply checkbox filters (AND logic)
      if (activeFilters.size > 0) {
        filtered = filtered.filter(post => {
          return Array.from(activeFilters).every(filterKey => {
            return post[filterKey] === true;
          });
        });
      }
      
      // Apply tag filters (AND logic)
      if (activeTags.size > 0) {
        filtered = filtered.filter(post => {
          return Array.from(activeTags).every(tagKey => {
            return post[tagKey] === true;
          });
        });
      }

      // Update showing count
      updateShowingCount(filtered.length);

      container.innerHTML = filtered
        .map(
          (post, index) => `
<a href="post.html?id=${post.id}" class="block p-5 border-b border-gray-200 hover:shadow-md transition-all opacity-0 animate-fade-in" style="animation-delay: ${index * 70}ms">
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <h3 class="text-xl font-extrabold text-black mb-2">${post.title}</h3>
      <h3 class="text-sm text-gray-500 mb-2">${post.date}</h3>
      <h3 class="text-gray-400 mb-4">${post.excerpt}</h3>
      
      <div class="flex items-center space-x-2">
        
        ${post.audio ? `
          <div class="flex py-2 rounded-full items-center space-x-1 text-gray-600">
            <img src="./assets/audio.svg" alt="Audio Available" class="w-4 h-4">
            <span class="text-xs"></span>
          </div>
        ` : ''}
        
        ${post.explicit ? `
          <div class="flex py-2 rounded-full items-center space-x-1 text-gray-600">
            <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4">
            <span class="text-xs"></span>
          </div>
        ` : ''}
        
        <!-- Tampilkan tags -->
        <div class="flex flex-wrap gap-1">
          ${tags.map(tag => 
            post[tag.key] ? `
              <span class="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-800">
                ${tag.label}
              </span>
            ` : ''
          ).filter(tag => tag).join('')}
        </div>
        
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
        const activeFiltersText = Array.from(activeFilters).map(f => {
          if (f === 'starred') return 'Marked by Keanu';
          if (f === 'audio') return 'Audio Available';
          if (f === 'explicit') return 'Explicit Content';
          return f;
        });
        
        const activeTagsText = Array.from(activeTags).map(t => {
          const tagObj = tags.find(tag => tag.key === t);
          return tagObj ? tagObj.label : t;
        });
        
        const allActiveFilters = [...activeFiltersText, ...activeTagsText];
        
        container.innerHTML = `
          <div class="text-center py-8 mt-8 opacity-0 animate-fade-in">
            <p class="text-gray-500 mb-2">No posts match selected filters.</p>
            ${allActiveFilters.length > 0 ? `
              <p class="text-sm text-gray-400 mb-2">
                Active filters: ${allActiveFilters.join(', ')}
              </p>
            ` : ''}
            <button id="reset-empty-state" class="mt-2 px-4 py-2 bg-white text-blue-500 rounded-lg text-sm font-medium transition-colors">
              Reset all filters
            </button>
          </div>`;
        
        // Tambahkan event listener untuk tombol reset di empty state
        const resetEmptyStateBtn = document.getElementById('reset-empty-state');
        if (resetEmptyStateBtn) {
          resetEmptyStateBtn.addEventListener('click', resetAllFilters);
        }
      }
    }

    // Initial render and stats update
    updateStats();
    renderPosts();
    
    // Buat fungsi resetAllFilters bisa diakses dari global scope (optional)
    window.resetAllFilters = resetAllFilters;
  })
  .catch(err => console.error("Error loading posts:", err));