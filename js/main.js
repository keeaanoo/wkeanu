fetch('posts/list.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts');
    container.innerHTML = posts.map(post => `
      <a href="post.html?id=${post.id}" class="block px-5 py-5 hover:bg-gray-50 transition">
        <h3 class="text-lg font-semibold text-gray-800 hover:underline">${post.title}</h3>
        <p class="text-sm text-gray-500">${post.date}</p>
        <p class="text-gray-600 mt-1">${post.excerpt}</p>
      </a>
    `).join('');
  })
  .catch(err => console.error('Error loading posts:', err));
