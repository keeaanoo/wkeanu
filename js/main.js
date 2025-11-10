fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');
container.innerHTML = posts.map(post => `
<a href="post.html?id=${post.id}" class="block px-5 py-5 hover:bg-gray-50 transition">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-extrabold text-gray-800 hover:text-black">${post.title}</h3>
    
    <div class="flex items-center space-x-2 ml-2">
      ${post.starred ? `
        <span class="relative group inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4 text-black-400">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z" />
          </svg>
          <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
            Marked by Keanu
          </span>
        </span>
      ` : ''}

      ${post.audio ? `
        <span class="relative group inline-block">
          <img src="./assets/audio.svg" alt="Audio Available" class="w-4 h-4" />
          <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
            Audio Available
          </span>
        </span>
      ` : ''}

      ${post.explicit ? `
        <span class="relative group inline-block">
          <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4" />
          <span class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-md pointer-events-none">
            Explicit content
          </span>
        </span>
      ` : ''}

    </div>
  </div>

  

  <h2 class="text-sm text-gray-500 mb-3">${post.date}</h2>
  <h2 class="text-gray-400 text-bold mt-1">${post.excerpt}</h2>
</a>


`).join('');

  })
  .catch(err => console.error('Error loading posts:', err));
