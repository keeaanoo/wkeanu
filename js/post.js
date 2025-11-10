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
  <div class="flex items-center gap-2 mb-8">

    ${post.starred ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            class="w-4 h-4 text-black-400">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.04 5.135a.563.563 0 0 0 .475.347l5.404.406a.563.563 0 0 1 .32.982l-4.118 3.453a.563.563 0 0 0-.182.557l1.28 5.272a.563.563 0 0 1-.84.61l-4.646-2.826a.563.563 0 0 0-.586 0l-4.646 2.826a.563.563 0 0 1-.84-.61l1.28-5.272a.563.563 0 0 0-.182-.557L2.281 10.37a.563.563 0 0 1 .32-.982l5.404-.406a.563.563 0 0 0 .475-.347l2.04-5.135z" />
          </svg>
        <span class="text-sm">Marked by Keanu</span>
      </div>
    ` : ''}

    ${post.explicit ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg">
        <img src="./assets/explicit.svg" alt="Explicit Content" class="w-4 h-4" />
        <span class="text-sm">Explicit content</span>
      </div>
    ` : ''}

        ${post.audio ? `
      <div class="flex items-center gap-2 bg-white-50 border border-black-400 
                  text-black w-fit px-3 py-1 rounded-lg">
        <img src="./assets/audio.svg" alt="Audio available" class="w-4 h-4" />
        <span class="text-sm">Audio available</span>
      </div>
    ` : ''}
  </div>

  <h1 class="text-3xl md:text-4xl font-bold mb-2">${post.title}</h1>
  <p class="text-gray-500 mb-8">${post.date}</p>

  <div class="text-gray-800 leading-relaxed space-y-4 border-t pt-8">
    ${post.content}
  </div>
`;
      setTimeout(() => article.classList.add("opacity-100"), 50);
    })
    .catch(() => {
      document.getElementById('post').innerHTML = "<p>Failed to load post.</p>";
    });
}
