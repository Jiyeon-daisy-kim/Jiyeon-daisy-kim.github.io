class FooterBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      shadow.innerHTML = `
        <style>
        .contact-info {
            position: fixed;
            bottom: 0;
            
            padding: 0.8%;
            font-size: 16px;
            color: white;
            background-color: transparent;
        }

        .footer-image {
            width: 50px; /* 이미지 크기를 조절합니다 */
            height: auto; /* 비율을 유지하면서 크기 조정 */
            vertical-align: middle; /* 이미지와 텍스트가 같은 라인에 오도록 합니다 */
        }

        .contact-info-title{
            color: white !important;
            font-size: 12px !important;
        }

        .contact-info a {
            color: gray;
            text-decoration: none;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            margin-left: 12px;
        }

        .contact-info a:visited{
            color: gray;
        }

        .contact-info a:hover {
            color: gray;
            transition: 0.3s;
        }
        </style>
  
        <footer class="contact-info">
          <p>
            <img class="footer-image" src="assets/images/DAISYEON_LOGO_orange.png" alt="Daisyeon Logo">
            <a class="contact-info-title"><strong>Daisyeon</strong></a>
            <a href="https://www.instagram.com/daisyeonfilm/" target="_blank">Instagram</a>
            <a href="/quick-contact/">Email</a>
            <a href="https://www.youtube.com/@daisy_yeon">Youtube</a>
            <a href="https://medium.com/@daisyeonfilm">Medium</a>
            <a href="https://letterboxd.com/daisyeon/">LetterBoxd</a>
          </p>
        </footer>
      `;
    }
  }
  
  customElements.define('footer-bar', FooterBar);