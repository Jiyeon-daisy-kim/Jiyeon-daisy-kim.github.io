(function(d) {
  var config = {
    kitId: 'qme8xbq',
    scriptTimeout: 3000,
    async: true
  },
  h = d.documentElement,
  t = setTimeout(function() {
    h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
  }, config.scriptTimeout),
  tk = d.createElement("script"),
  f = false,
  s = d.getElementsByTagName("script")[0],
  a;

  h.className += " wf-loading";
  tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
  tk.async = true;
  tk.onload = tk.onreadystatechange = function() {
    a = this.readyState;
    if (f || (a && a !== "complete" && a !== "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);


class NavBar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .navigator {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          position: fixed;
          width: 80%;
          font-family: 'Pretendard', sans-serif;
        }

        .site-name {
          margin: 0;
          font-size: 24px;
          font-family: 'Espacio Novo', sans-serif;
          color: white;
        }

        .site-name a {
          color: white;
          text-decoration: none;
        }

        .navigator ul {
          display: flex;
          margin: 0%;
          padding: 0%;
          flex-wrap: nowrap;
        }

        .navigator li {
          display: inline;
          align-self: center;
          margin-left: 3%;
          margin-right: 3%;
        }

        .navigator a {
          text-decoration: none;
        }

        .navigator a:hover {
          color: gray;
          transition: 0.3s;
        }

        .nav-menu {
          display: inline-flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .nav-menu.active {
          color: black;
          font-weight: bold;
        }

        .flower-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          font-size: 14px;
          padding-left: 5%;
        }

        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }
      </style>

      <nav class="navigator">
        <h3 class="site-name"><a href="/">Daisyeon</a></h3>
        <ul>
          <li><a href="/" class="nav-menu">Home</a></li>
          <li><a href="/introduction/" class="nav-menu">Introduction</a></li>
          <li><a href="/color/" class="nav-menu">Color</a></li>
          <li><a href="/press/" class="nav-menu">Press</a></li>
          <li><a href="/art/" class="nav-menu">Artwork</a></li>
          <li class="dropdown">
            <a href="/film/" class="nav-menu">
              Film
              <img class="flower-icon" src="assets/images/daisy_flower.png" alt="flower icon" />
            </a>
            <div class="dropdown-content">
              <a href="/mejfk-youicn/">Me:JFK, You:ICN</a>
              <a href="/hanam-cabbage/">Haenam Cabbage</a>
              <a href="/suddenly-home/">Suddenly, Home</a>
              <a href="/case-of-R/">Case of 'r'</a>
            </div>
          </li>
        </ul>
      </nav>
    `;

    const links = shadow.querySelectorAll('.nav-menu');
    const path = window.location.pathname;

    links.forEach(link => {
      const href = link.getAttribute('href');
      const normalizedHref = href.endsWith('/') ? href : href + '/';
      const normalizedPath = path.endsWith('/') ? path : path + '/';

      // HOME
      if (normalizedHref === '/' && (path === '/' || path.endsWith('index.html'))) {
        link.classList.add('active');
      }
      // FILM + 하위 페이지들
      else if (
        href === '/film/' &&
        (
          path.startsWith('/film') ||
          path.startsWith('/mejfk-youicn') ||
          path.startsWith('/hanam-cabbage') ||
          path.startsWith('/suddenly-home') ||
          path.startsWith('/case-of-R')
        )
      ) {
        link.classList.add('active');
      }
      // 나머지 메뉴들 (Introduction, Artwork)
      else if (normalizedPath.startsWith(normalizedHref)) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('nav-bar', NavBar);
