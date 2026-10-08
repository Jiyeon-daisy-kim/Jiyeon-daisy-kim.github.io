const list = document.querySelector('#artwork-list');
const viewer = document.querySelector('#artwork-viewer');
const dialog = document.querySelector('#detail-dialog');
const detailImage = document.querySelector('#detail-image');
const detailStatus = document.querySelector('#detail-status');
let selectedWork;
let detailIndex = 0;
let selectionButtons = [];
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function showDetail(index) {
  detailIndex = (index + selectedWork.details.length) % selectedWork.details.length;
  const detail = selectedWork.details[detailIndex];
  document.querySelector('#detail-title').textContent = `${detailIndex + 1}. ${detail.title}`;
  document.querySelector('#detail-count').textContent = `${detailIndex + 1} / ${selectedWork.details.length}`;
  detailStatus.textContent = 'Loading detail…';
  detailImage.hidden = true;
  detailImage.alt = detail.title;
  detailImage.onload = () => { detailImage.hidden = false; detailStatus.textContent = ''; };
  detailImage.onerror = () => { detailStatus.textContent = 'The image could not load. Close and select the detail to try again.'; };
  detailImage.src = detail.image;
  if (!dialog.open) dialog.showModal();
}
document.querySelector('#close-detail').addEventListener('click', () => dialog.close());
document.querySelector('#previous-detail').addEventListener('click', () => showDetail(detailIndex - 1));
document.querySelector('#next-detail').addEventListener('click', () => showDetail(detailIndex + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showDetail(detailIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
function selectWork(work, index) {
  selectedWork = work;
  selectionButtons.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
  viewer.replaceChildren();
  viewer.setAttribute('aria-busy', 'false');
  viewer.append(element('h2', 'work-title', work.title + (work.year ? `, ${work.year}` : '')));
  if (work.subtitle) { const subtitle = element('p', 'work-subtitle', work.subtitle); subtitle.lang = 'ko'; viewer.append(subtitle); }
  const stage = element('figure', 'image-stage' + (work.height > work.width ? ' portrait' : ''));
  const picture = element('img');
  picture.src = work.front; picture.alt = `${work.title}, front`; picture.width = work.width; picture.height = work.height;
  stage.append(picture);
  const layer = element('div', 'hotspot-layer');
  const details = element('div', 'detail-list');
  details.setAttribute('aria-label', 'Artwork details');
  work.details.forEach((detail, i) => {
    const box = element('button', 'hotspot'); box.type = 'button';
    box.setAttribute('aria-label', `Open detail ${i + 1}: ${detail.title}`); box.setAttribute('aria-haspopup', 'dialog');
    const [left, top, width, height] = detail.rect;
    Object.assign(box.style, { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` });
    // Smaller overlapping regions remain reachable above broad regions.
    box.style.zIndex = String(10000 - Math.round(width * height));
    box.append(element('span', '', String(i + 1))); box.addEventListener('click', () => showDetail(i)); layer.append(box);
    const link = element('button', '', `${i + 1}. ${detail.title}`); link.type = 'button'; link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', () => showDetail(i)); details.append(link);
  });
  stage.append(layer);
  if (work.back) {
    const tools = element('div', 'view-tools'); tools.setAttribute('aria-label', 'Artwork side');
    const front = element('button', '', 'Front'); const back = element('button', '', 'Back');
    const toggle = element('button', '', 'Detail boxes');
    for (const button of [front, back, toggle]) button.type = 'button';
    front.setAttribute('aria-pressed', 'true'); back.setAttribute('aria-pressed', 'false'); toggle.setAttribute('aria-pressed', 'true');
    let side = 'front'; let boxes = true;
    function setSide(next) {
      side = next; picture.src = work[side]; picture.alt = `${work.title}, ${side}`;
      front.setAttribute('aria-pressed', String(side === 'front')); back.setAttribute('aria-pressed', String(side === 'back'));
      toggle.disabled = side === 'back'; layer.hidden = side !== 'front' || !boxes;
    }
    front.addEventListener('click', () => setSide('front')); back.addEventListener('click', () => setSide('back'));
    toggle.addEventListener('click', () => { boxes = !boxes; toggle.setAttribute('aria-pressed', String(boxes)); layer.hidden = !boxes; });
    tools.append(front, back, toggle); viewer.append(tools);
  }
  viewer.append(stage);
  if (work.details.length) {
    viewer.append(element('p', 'explore-note', 'Select a numbered box or a detail below to look closer.'), details);
  }
  if (work.medium) viewer.append(element('p', 'work-medium', work.medium));
  if (work.english.length || work.korean.length) {
    const statement = element('div', 'work-statement');
    for (const [language, paragraphs] of [['en', work.english], ['ko', work.korean]]) {
      const column = element('div'); column.lang = language;
      paragraphs.forEach(text => column.append(element('p', '', text))); statement.append(column);
    }
    viewer.append(statement);
  }
}
fetch('data/imageMap.json?v=20261008i').then(response => {
  if (!response.ok) throw new Error('Artwork data unavailable');
  return response.json();
}).then(works => {
  selectionButtons = works.map((work, index) => {
    const button = element('button', 'artwork-choice'); button.type = 'button'; button.setAttribute('aria-controls', 'artwork-viewer');
    const thumbnail = element('img'); thumbnail.src = work.thumbnail; thumbnail.alt = ''; thumbnail.width = 180; thumbnail.height = 112;
    button.append(thumbnail, element('span', '', work.title));
    if (work.year) button.append(element('small', '', work.year));
    button.addEventListener('click', () => selectWork(work, index)); list.append(button); return button;
  });
  const match = works.findIndex(work => `#${work.id}` === window.location.hash);
  const initial = match >= 0 ? match : 0;
  selectWork(works[initial], initial);
}).catch(() => {
  viewer.setAttribute('aria-busy', 'false');
  document.querySelector('#gallery-status').textContent = 'Artwork could not load. Please refresh the page.';
});
