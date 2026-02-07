class FooterBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
      .contact-info {
          padding: 0.8%;
          font-size: 16px;
          color: white;
          background-color: transparent;
      }

      .footer-image {
          width: 50px;
          height: auto;
          vertical-align: middle;
      }

      .contact-info-title{
          color: black !important;
          font-size: 12px !important;
      }

      .contact-info a {
          color: darkgray;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          margin-left: 12px;
      }

      .contact-info a:visited{
          color: darkgray;
      }

      .contact-info a:hover {
          color: darkgray;
          transition: 0.3s;
      }
      </style>

      <footer class="contact-info">
        <p>
          <img class="footer-image" src="../assets/images/DAISYEON_LOGO_orange.png" alt="Daisyeon Logo">
          <a class="contact-info-title" part="title"><strong>Daisyeon</strong></a>
          <a href="https://www.instagram.com/daisy__yeon/" target="_blank">Instagram</a>
          <a href="../quick-contact/">Email</a>
          <a href="https://www.youtube.com/@daisy_yeon">Youtube</a>
        </p>
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);