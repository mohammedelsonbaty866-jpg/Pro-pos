class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          background-color: #4f46e5;
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 100%;
          margin: 0 auto;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
        .logo-icon {
          margin-left: 0.5rem;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          transition: opacity 0.2s;
        }
        .nav-link:hover {
          opacity: 0.8;
        }
        .nav-icon {
          margin-left: 0.5rem;
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      </style>
      <nav class="navbar">
        <div class="navbar-container">
          <div class="logo">
            CashFlow Commander
            <i data-feather="trending-up" class="logo-icon"></i>
          </div>
          <div class="nav-links">
            <a href="#" class="nav-link">
              الرئيسية
              <i data-feather="home" class="nav-icon"></i>
            </a>
            <a href="#" class="nav-link">
              الفواتير
              <i data-feather="file-text" class="nav-icon"></i>
            </a>
            <a href="#" class="nav-link">
              المصروفات
              <i data-feather="dollar-sign" class="nav-icon"></i>
            </a>
            <a href="#" class="nav-link">
              العملاء
              <i data-feather="users" class="nav-icon"></i>
            </a>
            <a href="#" class="nav-link">
              التقارير
              <i data-feather="pie-chart" class="nav-icon"></i>
            </a>
          </div>
          <div class="user-menu">
            <button id="darkModeToggle" class="text-white">
              <i data-feather="moon"></i>
            </button>
            <div class="avatar">م</div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
