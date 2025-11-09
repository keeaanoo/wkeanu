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
        <h1 class="text-3xl md:text-4xl font-bold mb-2">${post.title}</h1>
        <p class="text-gray-500 mb-8">${post.date}</p>
        <div class="text-gray-800 leading-relaxed space-y-4">${post.content}</div>
      `;
      setTimeout(() => article.classList.add("opacity-100"), 50);
    })
    .catch(() => {
      document.getElementById('post').innerHTML = "<p>Failed to load post.</p>";
    });
}
