document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#pressGrid');
  if (!grid) return;
  try {
    const response = await fetch('data/press-items.json?v=20261008j');
    if (!response.ok) throw new Error('Press data unavailable');
    const items = await response.json();
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'press-card' + (index === 0 ? ' featured' : '');
      const link = document.createElement('a');
      link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${item.publication}: ${item.title} (opens in a new tab)`);
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.src = item.image; image.alt = `Article preview from ${item.publication}`;
      image.width = item.width; image.height = item.height; image.decoding = 'async';
      image.loading = index === 0 ? 'eager' : 'lazy';
      if (index === 0) image.fetchPriority = 'high';
      image.addEventListener('error', () => { image.hidden = true; figure.classList.add('image-unavailable'); });
      figure.append(image);
      const body = document.createElement('div'); body.className = 'press-copy';
      const publication = document.createElement('p'); publication.className = 'publication'; publication.textContent = item.publication;
      const title = document.createElement('h2'); title.textContent = item.title;
      const action = document.createElement('span'); action.className = 'read-article'; action.textContent = 'Read article';
      const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); action.append(arrow);
      body.append(publication, title, action); link.append(figure, body); article.append(link); fragment.append(article);
    });
    grid.replaceChildren(fragment);
    if (!items.length) grid.textContent = 'Press features will be published soon.';
  } catch {
    grid.replaceChildren(Object.assign(document.createElement('p'), { className: 'press-status', textContent: 'Press could not load. Please refresh the page.' }));
  } finally { grid.setAttribute('aria-busy', 'false'); }
});
