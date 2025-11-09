fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');
container.innerHTML = posts.map(post => `
  <a href="post.html?id=${post.id}" class="block px-5 py-5 hover:bg-gray-50 transition">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800 hover:text-black">${post.title}</h3>
      ${post.starred ? `
        <span class="relative group ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4 text-blue-400">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z" />
          </svg>
          <span class="absolute right-5 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ditandai oleh Keanu
          </span>
        </span>
      ` : ''}
    </div>
    <p class="text-sm text-gray-500 mb-3">${post.date}</p>
    <p class="text-gray-600 mt-1">${post.excerpt}</p>
  </a>
`).join('');

  })
  .catch(err => console.error('Error loading posts:', err));
