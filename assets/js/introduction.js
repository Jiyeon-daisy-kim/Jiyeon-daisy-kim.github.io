document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function createFlower() {
    if (document.hidden || reducedMotion.matches) return;
    const flower = document.createElement('img');
    flower.src = '../assets/images/daisy_flower.png';
    flower.alt = '';
    flower.setAttribute('aria-hidden', 'true');
    flower.className = 'flower';
    const size = Math.random() * 30 + 20;
    const duration = Math.random() * 4 + 6;
    flower.style.left = `${Math.random() * Math.max(0, window.innerWidth - size)}px`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.animationDuration = `${duration}s`;
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), duration * 1000);
  }
  let interval;
  let startTimer;
  let pageShown = false;
  function resetFlowers() {
    clearInterval(interval);
    clearTimeout(startTimer);
    document.querySelectorAll('.flower').forEach(flower => flower.remove());
    if (!pageShown || document.hidden || reducedMotion.matches) return;
    // Give the fully loaded page a clear first frame before starting snowfall.
    startTimer = setTimeout(() => {
      createFlower();
      interval = setInterval(createFlower, 333);
    }, 700);
  }
  window.addEventListener('pageshow', () => {
    pageShown = true;
    resetFlowers();
  });
  window.addEventListener('pagehide', () => {
    pageShown = false;
    resetFlowers();
  });
  document.addEventListener('visibilitychange', resetFlowers);
  reducedMotion.addEventListener('change', resetFlowers);
});
